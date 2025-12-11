import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma.service';
import path from 'path';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TeachersService {
  constructor(private prismaService: PrismaService) {}
  async create(
    createTeacherDto: CreateTeacherDto,
    file: Express.Multer.File,
    baseUrl: string,
  ) {
    let imagePath = '';
    if (file) {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
      const ext = path.extname(file.originalname);
      const fileName = `${uuid()}${ext}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      imagePath = `${baseUrl}/uploads/${fileName}`;
    }

    try {
      const teacher = await this.prismaService.teacher.create({
        data: { ...createTeacherDto, image_url: imagePath },
      });
      return {
        data: teacher,
        message: `Created Teacher ${teacher.name} Success!`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: `Created Teacher Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
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
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
      this.prismaService.teacher.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.teacher.count({ where }),
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
    const teacher = await this.prismaService.teacher.findUnique({ where: { id: id } });
        if (!teacher) {
          return {
            data: null,
            message: `Teacher with ID ${id} Not Found!`,
            status: HttpStatus.NOT_FOUND,
            error: true,
          };
        }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.prismaService.teacher.findUnique({ where: { id: id } });
    if (!teacher) {
      return {
        data: null,
        message: `Teacher with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    try {
      await this.prismaService.teacher.update({
        where: { id },
        data: updateTeacherDto,
      });
      return {
        data: teacher,
        message: `Updated Teacher ${teacher.name} Success!`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: `Updated Teacher Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async remove(id: number) {
    const teacher = await this.prismaService.teacher.findUnique({ where: { id: id } });
        if (!teacher) {
          return {
            data: null,
            message: `Teacher with ID ${id} Not Found!`,
            status: HttpStatus.NOT_FOUND,
            error: true,
          };
        }
         try {
          await this.prismaService.teacher.delete({ where: { id: id } });
          return {
            data: teacher,
            message: `Deleted Teacher ${teacher.name} Success!`,
            status: HttpStatus.NO_CONTENT,
          };
        } catch (error) {
          return {
            data: null,
            message: `Deleted Teacher Fail!`,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error,
          };
        }
  }
}
