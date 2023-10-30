import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Headers} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, CreateCommentSchema } from './dto/create-comment.dto';
import { UpdateCommentDto, UpdateCommentSchema } from './dto/update-comment.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JoiValidationPipe} from "../pipes/ValidationPipe";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(
      private readonly commentsService: CommentsService,
      private jwtService: JwtService,
      private userService: UserService
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateCommentSchema))
  async create(@Headers('Authorization') auth: string, @Body() createCommentDto: CreateCommentDto) {

    const jwt = auth.replace('Bearer ', '');
    const user = this.jwtService.decode(jwt);
    const userInfo = this.userService.findOne(user['email']);
    await userInfo.then( r => { createCommentDto['user'] = r.id } );

    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(UpdateCommentSchema))
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
