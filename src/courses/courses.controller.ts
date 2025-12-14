import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, Query, Req } from '@nestjs/common';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

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
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    if(!query.limit && !query.page) {
      return this.coursesService.getAll();
    }
    return this.coursesService.findAll({ ...query, limit, page });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
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
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
