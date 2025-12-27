import { IsNumber, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsNumber()
    user_id: number

    @IsString()
    refresh_token: string;
}
