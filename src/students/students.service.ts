import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = await this.prismaService.student.create({
        data: createStudentDto,
      });
      return {
        data: student,
        message: `Created Student ${student.name} Success!`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: `Created Student Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async getAll() {
    return await this.prismaService.student.findMany();
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    email?: string;
    search?: string;
    date_of_birth?: string;
    gender: 'MALE' | 'FEMALE';
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'desc',
      email,
      date_of_birth,
      gender,
      search
    } = params || {};
    const where: any = {};  

    if (email) {
      where.email = { contains: email, mode: 'insensitive' };
    }
    if (gender) {
      where.gender = gender;
    }
      if (search) {
        where.OR = [
          {name: { contains: search}},
          {email: { contains: search}},
        ];
    }

    const skip = (page - 1) * limit;

    const orderBy = { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
      this.prismaService.student.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.student.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return await this.prismaService.student.findUnique({ where: { id: id } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.prismaService.student.update({
        where: { id },
        data: updateStudentDto,
      });
      return {
        data: student,
        message: `Updated Student ${student.name} Success!`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: `Updated Student Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async remove(id: number) {
    const student = await this.prismaService.student.findUnique({
      where: { id: id },
    });

    if (!student) {
      return {
        data: null,
        message: `Student with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    try {
      await this.prismaService.student.delete({ where: { id: id } });
      return {
        data: null,
        message: `Deleted Student Name: ${student.name} success!`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        data: null,
        message: `Deleted Student Name: ${student.name} fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }
}
