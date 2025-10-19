import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeesService {

  constructor(private prismaService: PrismaService){

  }
  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: {
      email?: string;
      date_of_birth?: string;
      gender: 'MALE' | 'FEMALE'
    }
  }) {


    const {page=1, limit=10, sortBy='id', sortOrder='desc',filter} = params || {};
    const where: any = {};

    const f: {
    email?: string;
    date_of_birth?: string;
    gender?: 'MALE' | 'FEMALE';
  } = filter || {};

    if(f.email){
      where.email = { contains: f.email, mode: 'insensitive'}
    }
    if(f.gender) {
      where.gender = f.gender
    }


    const skip = (page - 1) * limit;

    const orderBy = {[sortBy]: sortOrder};

    const[data,total] = await Promise.all([
      this.prismaService.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.employee.count({ where }),
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
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
