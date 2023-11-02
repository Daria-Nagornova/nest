import { ApiProperty } from '@nestjs/swagger';
import * as Joi from "joi";

export class CreateTaskDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    text: string;

    @ApiProperty()
    deadline: string;
}

export const CreateTaskSchema = Joi.object({
    title: Joi.string().required().min(6),
    text: Joi.string().required().max(100),
    status: Joi.string().required(),
    deadline: Joi.string(),
    user: Joi.number(),
});