import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class SlotService {
  constructor(private prisma: PrismaService) {}
  async createSlot(dto: CreateSlotDto, userId: string) {
    const event = await this.getManagedEvent(dto.eventId, userId);

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

  async getManagedEvent(id: string, userId: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
        OR: [{ hosts: { some: { id: userId } } }, { creatorId: userId }],
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }
}
