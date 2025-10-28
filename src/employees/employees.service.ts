import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
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

  async findOne(id: number) {
    return await this.prismaService.employee.findUnique({ where: { id: id } });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.prismaService.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
      return {
        data: employee,
        message: `Updated Teacher ${employee.name} Success!`,
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
    const employee = await this.prismaService.employee.findUnique({
      where: { id: id },
    });

    if (!employee) {
      return {
        data: null,
        message: `Teacher with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    try {
      await this.prismaService.employee.delete({ where: { id: id } });
      return {
        data: null,
        message: `Deleted Name: ${employee.name} success!`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        data: null,
        message: `Deleted Name: ${employee.name} fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }
}
