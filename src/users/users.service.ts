
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export type User = any;

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService){}

  async findOne(username: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({ where: {name: username}});
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.prismaService.user.findMany();
  }
}
