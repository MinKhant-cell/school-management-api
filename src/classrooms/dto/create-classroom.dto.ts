import { IsEnum, IsOptional, IsString } from "class-validator";
import { ClassroomStatus } from '@prisma/client';

export class CreateClassroomDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    grade: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(ClassroomStatus)
    status: ClassroomStatus;
}
