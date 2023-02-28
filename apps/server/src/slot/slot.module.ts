import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';

@Module({
  controllers: [SlotController],
  providers: [SlotService],
})
export class SlotModule {}
