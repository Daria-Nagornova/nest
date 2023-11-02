import { ApiProperty } from '@nestjs/swagger';
import * as Joi from "joi";

export class CreateCommentDto {
    @ApiProperty()
    text: string;
}

export const CreateCommentSchema = Joi.object({
    text: Joi.string().required().min(2),
    user: Joi.number(),
    task: Joi.number()
});