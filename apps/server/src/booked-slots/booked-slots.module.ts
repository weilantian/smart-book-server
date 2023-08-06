import { Module } from '@nestjs/common';

import { BookedSlotsController } from './booked-slots.controller';
import { BookedSlotsService } from './booked-slots.service';

@Module({
  controllers: [BookedSlotsController],
  providers: [BookedSlotsService],
})
export default class BookedSlotsModule {}
