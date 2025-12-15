import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CourseStatus } from '@prisma/client';
import { Type } from 'class-transformer';
export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  start_date: string;

  @IsNotEmpty()
  end_date: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  fees: number;

  @IsNotEmpty()
  currency: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(CourseStatus)
  status: CourseStatus;

}

// import { IsEmail, IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';
// import { Gender } from '@prisma/client';
// import { Type } from 'class-transformer';

// export class CreateStudentDto {
//   @IsNotEmpty()
//   name: string;

//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

// //   @IsNotEmpty()
// //   phone: string;

//   @IsNotEmpty()
//   @IsEnum(Gender)
//   gender: Gender;

//   @IsNotEmpty()
//   @Type(() => Date)
//   date_of_birth: Date;
// }

// model Course {
//   id          Int      @id @default(autoincrement())
//   name        String  @unique
//   start_date  DateTime?
//   end_date    DateTime?
//   duration    String?
//   fees        BigInt?
//   currency    String?
//   description String?
//   employee    Employee?    @relation(fields: [employee_id], references: [id])
//   employee_id  Int?   @unique
//   photo_url   String?
//   status      CourseStatus    @default(UPCOMING)
//   is_publish  Boolean  @default(false)
//   created_by  BigInt?
//   created_at  DateTime @default(now())
//   updated_at  DateTime?
// }