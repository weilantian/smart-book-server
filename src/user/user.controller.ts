import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import SafeUser from './models/SafeUserResponse';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @ApiExtraModels(SafeUser)
  @ApiOkResponse({ type: SafeUser })
  @UseGuards(JwtGuard)
  getCurrentUser(@GetUser('id') userId: string): Promise<SafeUser> {
    return this.userService.getUser(userId);
  }
}
