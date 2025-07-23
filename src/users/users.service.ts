import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async findUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const newUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!newUser) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return newUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
