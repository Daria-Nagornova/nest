import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto} from "./user/dto/create-user.dto";
import { AuthGuard } from '@nestjs/passport';
import { AuthService} from "./auth/auth.service";
import {UserService} from "./user/user.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly userService: UserService,
      private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
