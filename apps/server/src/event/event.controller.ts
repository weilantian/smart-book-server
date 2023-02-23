import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { EventService } from './event.service';
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @UseGuards(JwtGuard)
  @Get('user-managed-events')
  async userManagedEvents(
    @GetUser('id') userId: string,
    @Query('showEnded') showEnded: boolean = false,
  ) {
    return await this.eventService.userManagedEvents(userId, showEnded);
  }
}
