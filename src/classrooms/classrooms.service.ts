import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClassroomsService {
  constructor(private prismaService: PrismaService) {}
  async create(createClassroomDto: CreateClassroomDto) {
    try {
          const classroom = await this.prismaService.classroom.create({
            data: createClassroomDto,
          });
          return {
            data: classroom,
            message: `Created Classroom ${classroom.name} Success!`,
            status: HttpStatus.CREATED,
          };
        } catch (error) {
          console.log(error);
          return {
            data: null,
            message: `Created Classroom Fail!`,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error,
          };
        }
  }

  async getAll() {
    return await this.prismaService.classroom.findMany();
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'desc',
      search,
    } = params || {};
    const where: any = {};

    if (search) {
      where.OR = [{ name: { contains: search } }];
    }

    const skip = (page - 1) * limit;

    const orderBy = { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
      this.prismaService.classroom.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.classroom.count({ where }),
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
    const classroom = await this.prismaService.classroom.findUnique({ where: { id: id } });
    if (!classroom) {
      return {
        data: null,
        message: `Classroom with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    return classroom;
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    const classroom = await this.prismaService.classroom.findUnique({ where: { id: id } });
    if (!classroom) {
      return {
        data: null,
        message: `Classroom with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    try{
      await this.prismaService.classroom.update({
        where: { id },
        data: updateClassroomDto,
      });
      return {
        data: classroom,
        message: `Updated Classroom ${classroom.name} Success!`,
        status: HttpStatus.OK,
      };
    }catch(error){
      console.log(error);
      return {
        data: null,
        message: `Updated Classroom Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async remove(id: number) {
    const classroom = await this.prismaService.classroom.findUnique({ where: { id: id } });
    if (!classroom) {
      return {
        data: null,
        message: `Classroom with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    try {
          await this.prismaService.classroom.delete({ where: { id: id } });
          return {
            data: null,
            message: `Deleted Classroom Name: ${classroom.name} success!`,
            status: HttpStatus.NO_CONTENT,
          };
        } catch (error) {
          return {
            data: null,
            message: `Deleted Classroom Name: ${classroom.name} fail!`,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error,
          };
        }
  }
}
