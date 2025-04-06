import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get()
  async findUser(@Query() query: { name: string }) {
    const user = await this.userService.findUser(query);
    return user;
  }

  @Post()
  async createUser(@Body('name') name: string) {
    const user = await this.userService.createUser(name);
    return user;
  }
}
