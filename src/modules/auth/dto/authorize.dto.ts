import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthorizeDto {
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
