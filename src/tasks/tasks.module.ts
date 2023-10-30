import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Task } from "./entities/task.entity"
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), JwtModule, UserModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
