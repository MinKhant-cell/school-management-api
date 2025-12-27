import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    return await this.prismaService.user.findUnique({ where: { email: email } });
  }

  async findById(id: number) {
    return await this.prismaService.user.findUnique({ where: { id: id } });
  }

  async updateRefreshToken(userId: number, hashedRefreshToken: string) {
  await this.prismaService.user.update({
    where: { id: userId },
    data: { refresh_token: hashedRefreshToken },
  });
}

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}