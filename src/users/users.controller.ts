import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllUsers(@Request() req) {
    return this.usersService.findAll();
  }
}
