import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(dto: CreateEventDto, userId: string) {
    const event = await this.prisma.event.create({
      data: {
        ...dto,
        status: 'AVAILABLE',
        creatorId: userId,
      },
    });

    return event;
  }

  async userManagedEvents(userId: string, showEnded: boolean) {
    const events = await this.prisma.event.findMany({
      where: {
        NOT: {
          status: showEnded ? undefined : 'ENDED',
        },
        OR: [
          { creatorId: userId },
          {
            hosts: {
              some: { id: userId },
            },
          },
        ],
      },
    });

    return events;
  }
}
