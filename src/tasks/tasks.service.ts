import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity"

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
      private repository: Repository<Task>,
  ) {}

  create(data: CreateTaskDto) {
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateTaskDto) {
    return  this.repository.save({...data, id});
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
