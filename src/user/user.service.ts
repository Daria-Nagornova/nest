import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity"

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
}
