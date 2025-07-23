import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

// const createToken = id =>
//   jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    const token = this.jwtService.sign({ id: newUser._id });
    return {
      user: newUser,
      token,
    };
  }

  async login(LoginUserDto: LoginUserDto): Promise<any> {
    // 1-check if the user exists and password is correct
    const { email, password } = LoginUserDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect Email Or Password');
    }

    // 2- generate Token
    //   const token = createToken(user._id);
    const token = this.jwtService.sign({ id: user._id });
    return {
      user,
      token,
    };
  }
}
