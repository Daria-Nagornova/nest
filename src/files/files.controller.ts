import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto, CreateFileSchema } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import {ApiTags} from "@nestjs/swagger";
import {JoiValidationPipe} from "../pipes/ValidationPipe";

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateFileSchema))
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
