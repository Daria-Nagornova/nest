import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity"
import {PageOptionsDto} from "../paginate/page-options.dto";
import {PageDto} from "../paginate/page.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {PageMetaDto} from "../paginate/page-meta.dto";


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

  public async getComments(
      pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateCommentDto>> {
    const queryBuilder = this.repository.createQueryBuilder("comment");

    queryBuilder
        .orderBy("comment.created_at", pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
