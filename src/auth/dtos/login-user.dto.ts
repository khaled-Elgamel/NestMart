import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'incorrect email' })
  @IsNotEmpty({ message: 'email is required' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  readonly password: string;
}
