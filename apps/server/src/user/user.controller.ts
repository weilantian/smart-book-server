import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @UseGuards(JwtGuard)
  getCurrentUser(@GetUser('id') userId: string) {
    return this.userService.getUser(userId);
  }
}
