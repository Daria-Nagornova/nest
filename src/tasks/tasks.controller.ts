import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, UsePipes} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {CreateTaskDto, CreateTaskSchema} from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {AuthGuard} from "@nestjs/passport";
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Task as taskEntity } from './entities/task.entity'
import {JoiValidationPipe} from "../pipes/ValidationPipe";

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({ status: 201, description: 'Задача успешно добавлена', type: taskEntity})
  @ApiResponse({ status: 401, description: 'Неавторизовано'})
  @Post()
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
