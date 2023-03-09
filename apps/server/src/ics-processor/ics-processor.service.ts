import { Injectable } from '@nestjs/common';
import { IcsProcessableEvent } from './ics.model';

@Injectable()
export class IcsProcessorService {
  createEvents(events: Array<IcsProcessableEvent>) {
    // Process event date string (remove - and :)
    const processedEvents = events.map((event) => {
      return {
        ...event,
        startDate: event.startDate.replace(/[-:]/g, ''),
        endDate: event.endDate.replace(/[-:]/g, ''),
        created_at: event.created_at.replace(/[-:]/g, ''),
        updated_at: event.updated_at.replace(/[-:]/g, ''),
      };
    });
    const icsEventStr = `BEGIN:VCALENDAR
PRODID:-//SmartBookIO//SmartBook//EN
VERSION:2.0
CALSCALE:GREGORIAN
${processedEvents.map(
  (event, index) => `
BEGIN:VEVENT
UID:smbk-ics-${index}
DTSTART:${event.startDate}
DTEND:${event.endDate}
DTSTAMP:${event.updated_at}
CREATED:${event.created_at}
STATUS:CONFIRMED
SUMMARY:${event.title}
SEQUENCE:0
DESCRIPTION:${event.description}
URL:${event.url}
END:VEVENT
`,
)}
    `;
    return icsEventStr;
  }
}
