import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotService } from './slot.service';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}
  @Post('create')
  @UseGuards(JwtGuard)
  async createSlot(@GetUser('id') userId: string, @Body() dto: CreateSlotDto) {
    return await this.slotService.createSlot(dto, userId);
  }

  @Get('/by-event')
  @UseGuards(JwtGuard)
  async getSlotsOfEvent(
    @GetUser('id') userId: string,
    @Query('eventId') eventId: string,
  ) {
    return await this.slotService.getSlotsOfEvent(eventId, userId);
  }
}
