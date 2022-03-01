/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/models/user';
import { AuthService } from './auth.service';
import { AuthorizeDto } from './dto/authorize.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authDto: AuthorizeDto): Promise<User> {
    return this.authService.signup(authDto);
  }

  @Post('/login')
  login(@Body() authDto: AuthorizeDto): Promise<User> {
    return this.authService.login(authDto);
  }

  @Get('/getUser')
  getUser(@Req() req: any): Promise<User> {
    return this.authService.getUser(req);
  }
}
