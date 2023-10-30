import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import * as Joi from "joi";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
export const UpdateCommentSchema = Joi.object({
    text: Joi.string().min(2),
    user: Joi.number(),
    task: Joi.number()
});