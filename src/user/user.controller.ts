import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UsePipes} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto, CreateUserSchema} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiTags} from "@nestjs/swagger";
import {JoiValidationPipe} from "../pipes/ValidationPipe";
import {AuthGuard} from "@nestjs/passport";


@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }*/

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/role')
  updateRoleOfUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateRoleOfUser(+id, updateUserDto);
  }
}
