import * as Joi from 'joi';

export class CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const CreateUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
});