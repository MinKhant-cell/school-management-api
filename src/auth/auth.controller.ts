import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
// import { AuthGuard } from './auth.guard';
import { Public } from '../common/decorators/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
   login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Public()
  @Post('refresh_token')
  refreshTokens(@Body() data: { user_id: number; refresh_token: string }) {
    return this.authService.refreshTokens(data.user_id, data.refresh_token);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.findOne(+req.user.id);
  }


  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
