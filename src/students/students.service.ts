import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {

  constructor(private prismaService: PrismaService){

  }

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
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
    return await this.prismaService.student.findUnique({where: {id: id}})
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(id: number) {
    const student = await this.prismaService.student.findUnique({where: {id: id}});

    if(!student){
      throw new NotFoundException();
    }
    try{
    await this.prismaService.student.delete({where: {id: id}})
    return {
      data: null,
      message: `Deleted Student Name: ${student.name} success!`,
      status: HttpStatus.NO_CONTENT
    };
    }catch(error){
      return {
        data: null,
        message: `Deleted Student Name: ${student.name} fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error
      };
    }
    
  }
}
