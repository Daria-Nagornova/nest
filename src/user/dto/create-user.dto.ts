import * as Joi from 'joi';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    password: string;
}

export const CreateUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    birthday: Joi.string(),
});