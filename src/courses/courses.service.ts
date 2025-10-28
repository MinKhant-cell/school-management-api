import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.prismaService.course.create({
        data: createCourseDto,
      });
      return {
        data: course,
        message: `Created Course ${course.name} Success!`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: `Created Course Fail!`,
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
      ];
    }

    const skip = (page - 1) * limit;

    const orderBy = { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
      this.prismaService.course.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.course.count({ where }),
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
    return await this.prismaService.course.findUnique({ where: { id: id } });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.prismaService.course.update({
        where: { id },
        data: updateCourseDto,
      });
      return {
        data: course,
        message: `Updated Course ${course.name} Success!`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: `Updated Course Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async remove(id: number) {
    const course = await this.prismaService.course.findUnique({
      where: { id: id },
    });
    if (!course) {
      return {
        data: null,
        message: `Course with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    try {
      await this.prismaService.course.delete({ where: { id: id } });
      return {
        data: null,
        message: `Deleted Course Name: ${course.name} success!`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        data: null,
        message: `Deleted Course Name: ${course.name} fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }
}
