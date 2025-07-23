import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SetMetadata('IS_Public', true)
  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() LoginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(LoginUserDto);
  }

  // @Role('admin')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
