import { Controller, Get, UseGuards } from '@nestjs/common';
import { BookedSlotsService } from './booked-slots.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('booked-slots')
export class BookedSlotsController {
  constructor(private bookedSlotService: BookedSlotsService) {}

  @UseGuards()
  @Get()
  async getUserBookedSlots(@GetUser('id') userId: string) {
    return this.bookedSlotService.getAllBookedSlotsByUserId(userId);
  }
}
