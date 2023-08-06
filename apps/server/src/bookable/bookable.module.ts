import { Module } from '@nestjs/common';
import { BookableController } from './bookable.controller';
import { BookableService } from './bookable.service';

@Module({
  controllers: [BookableController],
  providers: [BookableService],
})
export default class BookableModule {}
