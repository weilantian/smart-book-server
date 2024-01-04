import {
  Controller,
  Get,
  Header,
  NotImplementedException,
  Param,
} from '@nestjs/common';
import { IcsService } from './ics.service';

@Controller('ics')
export default class IcsController {
  constructor(private icsService: IcsService) {}
  @Get('test.ics')
  @Header('Content-Type', 'text/calendar')
  @Header('Content-Disposition', 'attachment; filename="test.ics"')
  getTestEvent() {
    return this.icsService.getTestEvent();
  }

  @Get(':id')
  @Header('Content-Type', 'text/calendar')
  @Header('Content-Disposition', 'attachment; filename="test.ics"')
  getEvent(@Param('id') id: string) {
    return new NotImplementedException('Not implemented yet.');
  }

  @Get(':id/:event')
  @Header('Content-Type', 'text/calendar')
  @Header('Content-Disposition', 'attachment; filename="test.ics"')
  getEventById(@Param('id') id: string, @Param('event') event: string) {
    return new NotImplementedException('Not implemented yet.');
  }
}
