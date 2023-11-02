import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity"
import {PageOptionsDto} from "../paginate/page-options.dto";
import {PageDto} from "../paginate/page.dto";
import {PageMetaDto} from "../paginate/page-meta.dto";


@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private repository: Repository<User>,
  ) {}

  async register(data: CreateUserDto) {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    return this.repository.save(data);
  }

  async login(data: CreateUserDto) {
    const user = await this.repository.findOneBy({ email: data.email });
    if (!user) {
      return false;
    }

    return await bcrypt.compare(data.password, user.password);
  }

  async create(data: CreateUserDto) {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(email: string) {
    return this.repository.findOneBy({ email });
  }

  update(id: number, data: UpdateUserDto) {
    return  this.repository.save({...data, id});
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  updateRoleOfUser(id: number, data: UpdateUserDto) {
    return this.repository.update(id, data);
  }

  public async getUsers(
      pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateUserDto>> {
    const queryBuilder = this.repository.createQueryBuilder("user");

    queryBuilder
        .orderBy("user.created_at", pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
