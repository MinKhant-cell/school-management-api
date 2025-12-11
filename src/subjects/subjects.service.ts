import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SubjectsService {
  constructor(private prismaService: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto, file: Express.Multer.File, baseUrl: string) {
    let imagePath = '';
    if (file) {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
  const ext = path.extname(file.originalname);
  const fileName = `${uuid()}${ext}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      imagePath = `${baseUrl}/uploads/${fileName}`;
    }
    try {
          const student = await this.prismaService.subject.create({
            data: {...createSubjectDto, image_url: imagePath},
          });
          return {
            data: student,
            message: `Created Subject ${student.name} Success!`,
            status: HttpStatus.CREATED,
          };
        } catch (error) {
          console.log(error);
          return {
            data: null,
            message: `Created Subject Fail!`,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error,
          };
        }
  }

  async getAll() {
    return await this.prismaService.subject.findMany();
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
      this.prismaService.subject.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.subject.count({ where }),
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
    const subject = await this.prismaService.subject.findUnique({ where: { id: id } });
    if (!subject) {
      return {
        data: null,
        message: `Subject with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    return subject;

  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.prismaService.subject.findUnique({ where: { id: id } });
    if (!subject) {
      return {
        data: null,
        message: `Subject with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
    try {
      await this.prismaService.subject.update({
        where: { id },
        data: updateSubjectDto,
      });
      return {
        data: subject,
        message: `Updated Subject ${subject.name} Success!`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: `Updated Subject Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async remove(id: number) {
    const subject = await this.prismaService.subject.findUnique({ where: { id: id } });
    if (!subject) {
      return {
        data: null,
        message: `Subject with ID ${id} Not Found!`,
        status: HttpStatus.NOT_FOUND,
        error: true,
      };
    }
     try {
      await this.prismaService.subject.delete({ where: { id: id } });
      return {
        data: subject,
        message: `Deleted Subject ${subject.name} Success!`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return {
        data: null,
        message: `Deleted Subject Fail!`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }
}
