import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn( email, password): Promise<any> {
    const user = await this.usersService.findOne(email);
    if(!user) {
      throw new UnauthorizedException();
    }
    
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user.id, username: user.name };
     const accessToken = await this.jwtService.signAsync(payload, {
    expiresIn: '15m',
  });
    const refreshToken = await this.jwtService.signAsync(payload, {
    expiresIn: '7d',
  });

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
  const user = await this.usersService.findById(userId);

  if (!user || !user.refreshToken) {
    throw new ForbiddenException();
  }
  console.log(user);
  const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
  if (!isValid) {
    throw new ForbiddenException();
  }

  const payload = { sub: user.id, username: user.name };

  return {
    access_token: await this.jwtService.signAsync(payload, { expiresIn: '15m' }),
  };
}

  verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`; 
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
