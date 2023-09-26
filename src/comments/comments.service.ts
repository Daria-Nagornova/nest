import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity"


@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(Comment)
      private repository: Repository<Comment>,
  ) {}

  create(data: CreateCommentDto) {
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateCommentDto) {
    return  this.repository.save({...data, id});
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
