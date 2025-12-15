import { IsOptional, IsString } from "class-validator";

export class CreateClassroomDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    grade: string;
}
