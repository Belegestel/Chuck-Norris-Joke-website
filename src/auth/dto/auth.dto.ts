import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'E-mail address not valid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Minimum password length is 6 characters' })
  password: string;
}
