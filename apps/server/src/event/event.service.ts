import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

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
