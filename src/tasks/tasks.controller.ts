import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UsePipes,
  Headers
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {CreateTaskDto, CreateTaskSchema} from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {AuthGuard} from "@nestjs/passport";
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Task as taskEntity } from './entities/task.entity'
import {JoiValidationPipe} from "../pipes/ValidationPipe";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(
      private readonly tasksService: TasksService,
      private jwtService: JwtService,
      private userService: UserService
  ) {}

  @ApiResponse({ status: 201, description: 'Задача успешно добавлена', type: taskEntity})
  @ApiResponse({ status: 401, description: 'Неавторизовано'})
  @Post()
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  async create(@Headers('Authorization') auth: string, @Body() createTaskDto: CreateTaskDto) {
    const jwt = auth.replace('Bearer ', '');
    const user = this.jwtService.decode(jwt);
    const userInfo = this.userService.findOne(user['email']);
    await userInfo.then( r => { createTaskDto['user'] = r.id } );

    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
