import { Injectable } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TimetablesService {
  constructor(private prismaService: PrismaService) {}
  create(createTimetableDto: CreateTimetableDto) {
    return 'This action adds a new timetable';
  }

   async getAll() {
    return await this.prismaService.timetable.findMany();
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
      search
    } = params || {};
    const where: any = {};  

    if (search) {
        where.OR = [
          {name: { contains: search}},
        ];
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
      this.prismaService.timetable.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.timetable.count({ where }),
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
    return `This action returns a #${id} timetable`;
  }

  update(id: number, updateTimetableDto: UpdateTimetableDto) {
    return `This action updates a #${id} timetable`;
  }

  remove(id: number) {
    return `This action removes a #${id} timetable`;
  }
}
