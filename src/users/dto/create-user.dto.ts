import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'john@gmail.com', description: 'Email'})
    email: string;
    @ApiProperty({example: "*********", description: 'Пароль пользователя'})
    password: string;
}