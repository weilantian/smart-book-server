import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookedSlotsService } from './booked-slots.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import GetUserBookedSlotsDto from './dto/getUserBookedSlots.dto';

@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
@Controller('booking')
export class BookedSlotsController {
  constructor(private bookedSlotService: BookedSlotsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUserBookedSlots(
    @GetUser('id') userId: string,
    @Query() dto: GetUserBookedSlotsDto,
  ) {
    return await this.bookedSlotService.getAllBookedSlotsByUserId(dto, userId);
  }
}
