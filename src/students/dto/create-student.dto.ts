import { IsEmail, IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

//   @IsNotEmpty()
//   phone: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @Type(() => Date)
  date_of_birth: Date;
}
