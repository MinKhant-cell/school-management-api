import { Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClassroomsService {
  constructor(private prismaService: PrismaService) {}
  create(createClassroomDto: CreateClassroomDto) {
    return 'This action adds a new classroom';
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

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
