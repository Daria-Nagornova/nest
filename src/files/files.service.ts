import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {File} from "./entities/file.entity";


@Injectable()
export class FilesService {
  constructor(
      @InjectRepository(File)
      private repository: Repository<File>,
  ) {}

  create(data: CreateFileDto) {
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateFileDto) {
    return this.repository.save({...data, id});
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
