import { Injectable } from '@nestjs/common';

@Injectable()
export class IcsService {
  getTestEvent() {
    return `BEGIN:VCALENDAR
PRODID:-//SmartBookIO//SmartBook//EN
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:7pglbsd3skh5sefihtb64dusfc
DTSTART:20230304T213000Z
DTEND:20230305T004500Z
DTSTAMP:20230309T062632Z
CREATED:20230309T062632Z
STATUS:CONFIRMED
SUMMARY:Test Event
SEQUENCE:0
DESCRIPTION:This is a test event
LOCATION:Test Location
URL:https://smartbook.io
END:VEVENT
END:VCALENDAR`;
  }
}
