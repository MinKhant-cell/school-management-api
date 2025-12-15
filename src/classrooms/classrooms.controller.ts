import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
    @UseInterceptors(
        FileInterceptor('image', {
          limits: { fileSize: 5 * 1024 * 1024 },
          fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
              return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
          },
        }),
      )
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createClassroomDto: CreateClassroomDto) {
      return this.classroomsService.create(createClassroomDto);
    }
  
    @Get()
    findAll(@Query() query: any) {
      const limit = parseInt(query.limit) || 10;
      const page = parseInt(query.page) || 1;
      if(!query.limit && !query.page) {
        return this.classroomsService.getAll();
      }
      return this.classroomsService.findAll({ ...query, limit, page });
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.classroomsService.findOne(+id);
    }
  
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
          limits: { fileSize: 5 * 1024 * 1024 },
          fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
              return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
          },
        }),
      )
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
      return this.classroomsService.update(+id, updateClassroomDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.classroomsService.remove(+id);
    }
}
