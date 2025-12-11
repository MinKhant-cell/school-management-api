import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ClassroomsController],
  providers: [ClassroomsService, PrismaService],
})
export class ClassroomsModule {}
