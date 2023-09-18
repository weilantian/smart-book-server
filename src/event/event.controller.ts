// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Query,
//   UseGuards,
// } from '@nestjs/common';
// // import { GetUser } from 'src/auth/decorator/get-user.decorator';
// import { JwtGuard } from 'src/auth/guard/jwt.guard';
// import { CreateEventDto } from './dto/create-event.dto';
// import { EventService } from './event.service';
// @Controller('event')
// export class EventController {
//   constructor(private eventService: EventService) {}
//   @UseGuards(JwtGuard)
//   @Get('user-managed-events')
//   async userManagedEvents(
//     @GetUser('id') userId: string,
//     @Query('showEnded') showEnded: boolean,
//   ) {
//     return await this.eventService.userManagedEvents(userId, showEnded);
//   }

//   @UseGuards(JwtGuard)
//   @Post('create')
//   async createEvent(
//     @GetUser('id') userId: string,
//     @Body() dto: CreateEventDto,
//   ) {
//     return await this.eventService.createEvent(dto, userId);
//   }

//   @UseGuards(JwtGuard)
//   @Delete(':id')
//   async deleteEvent(
//     @GetUser('id') userId: string,
//     @Param('id') eventId: string,
//   ) {
//     return await this.eventService.deleteEvent(eventId, userId);
//   }

//   @UseGuards(JwtGuard)
//   @Get(':id')
//   async getEvent(@GetUser('id') userId: string, @Param('id') eventId: string) {
//     return await this.eventService.getEvent(eventId, userId);
//   }
// }
