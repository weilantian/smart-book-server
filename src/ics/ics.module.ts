import { Module } from '@nestjs/common';
import { IcsProcessorModule } from '../ics-processor/ics-processor.module';
import IcsController from './ics.controller';
import { IcsService } from './ics.service';

@Module({
  imports: [IcsProcessorModule],
  controllers: [IcsController],
  providers: [IcsService],
})
export class IcsModule {}
