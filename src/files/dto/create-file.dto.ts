import { ApiProperty } from '@nestjs/swagger';
import * as Joi from "joi";

export class CreateFileDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    path: string;

    @ApiProperty()
    taskId: number;
}

export const CreateFileSchema = Joi.object({
    name: Joi.string().required().min(6),
    path: Joi.string().required().max(200),
    task: Joi.number(),
});