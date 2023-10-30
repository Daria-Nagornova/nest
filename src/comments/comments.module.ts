import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "./entities/comment.entity";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), JwtModule, UserModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
