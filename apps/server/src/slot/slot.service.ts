import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class SlotService {
  constructor(private prisma: PrismaService) {}
  async createSlot(dto: CreateSlotDto, userId: string) {
    const event = await this.getManagedEvent(dto.eventId, userId, true);

    const slot = await this.prisma.slot.create({
      data: {
        event: {
          connect: {
            id: event.id,
          },
        },
        status: 'AVAILABLE',
        availableParticipatorNum: dto.availableParticipatorNum,
        startDate: dto.startDate,
        endDate: dto.endDate,
        booking: dto.booking,
        host: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return slot;
  }

  async getSlotsOfEvent(eventId: string, userId: string) {
    const event = await this.getManagedEvent(eventId, userId);

    const slots = await this.prisma.slot.findMany({
      where: {
        eventId: event.id,
      },
      include: {
        _count: {
          select: {
            participators: true,
          },
        },
        host: {
          select: {
            id: true,
            name: true,
            profileImgUrl: true,
          },
        },
        participators: {
          select: {
            id: true,
          },
        },
      },
    });

    return slots.map((slot) => ({
      ...slot,
      participatorNum: slot._count.participators,
      booked: slot.participators.some(
        (participator) => participator.id === userId,
      ),
    }));
  }

  async getManagedEvent(id: string, userId: string, adminOnly = false) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
        OR: [
          { hosts: { some: { id: userId } } },
          { creatorId: userId },
          adminOnly ? undefined : { participators: { some: { id: userId } } },
        ],
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }
}
