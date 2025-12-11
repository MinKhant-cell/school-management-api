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

  async findAll() {
    const classrooms = await this.prismaService.classroom.findMany();
    return classrooms;
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
