import { IsEmail, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  age?: number;
}