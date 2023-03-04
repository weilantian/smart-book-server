import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

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

  async deleteEvent(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.creatorId !== userId) {
      throw new UnauthorizedException('You are not the creator of this event');
    }

    await this.prisma.event.delete({
      where: { id },
    });

    return event;
  }

  async getEvent(id: string, userId: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
        OR: [
          { participators: { some: { id: userId } } },
          { hosts: { some: { id: userId } } },
          { creatorId: userId },
        ],
      },
      include: {
        hosts: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    let role = 'PARTICIPATOR';

    if (event.creatorId === userId) {
      role = 'CREATOR';
    } else if (event.hosts.some((host) => host.id === userId)) {
      role = 'HOST';
    } else {
      role = 'PARTICIPATOR';
    }

    delete event.hosts;

    return { ...event, role };
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
