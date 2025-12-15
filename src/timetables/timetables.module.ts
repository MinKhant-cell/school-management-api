import { Module } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TimetablesController],
  providers: [TimetablesService, PrismaService],
})
export class TimetablesModule {}
