import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';
import { User } from './user.schema';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { Role } from 'src/common/decorators/role.decorator';

@Role('admin')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseMongoIdPipe)
    id: string,
  ): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post()
  // @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
