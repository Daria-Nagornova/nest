import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
    // Добавим список пользователей

    users = [

        {

            id: 1,

            name: 'User 1',

        },

        {

            id: 2,

            name: 'User 2',

        },

    ];

    @Get() // Укажем что наш метод будет доступен при GET запросе users/

    getAll(): { name: string; id: number }[] {

        return this.users;

    }
    gi
    @Get(':id') // Пользователь будет доступен по users/:id

    findOne(

        @Param('id', ParseIntPipe) id: number, // Метод принимает параметр id, который необходимо конвертировать в int

    ): { name: string; id: number } | null {

        return this.users.find((user) => user.id === id);

    }
}

