import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UsePipes, Query} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto, CreateUserSchema} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiTags} from "@nestjs/swagger";
import {JoiValidationPipe} from "../pipes/ValidationPipe";
import {AuthGuard} from "@nestjs/passport";
import {PageOptionsDto} from "../paginate/page-options.dto";
import {PageDto} from "../paginate/page.dto";


@ApiTags('Users')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
      private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Put(':id/role')
  updateRoleOfUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateRoleOfUser(+id, updateUserDto);
  }

  @Get('all')
  async getUsers(
      @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateUserDto>> {
    return this.userService.getUsers(pageOptionsDto);
  }
}
