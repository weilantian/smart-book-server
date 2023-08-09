import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookableDto } from './dto/create-bookable-dto';
import { BookableDetailResponseDto } from './dto/bookable-response-dto';
import { computeBookableSlots } from 'src/utils/splitTime';

@Injectable()
export class BookableService {
  constructor(private prisma: PrismaService) {}

  async createBookable(dto: CreateBookableDto, userId: string) {
    const { availableSlots, ...bookableDetail } = dto;

    const bookable = await this.prisma.bookable.create({
      data: {
        ...bookableDetail,
        host: {
          connect: {
            id: userId,
          },
        },
        availableSlots: {
          create: [...availableSlots],
        },
      },
    });

    return bookable;
  }

  async getAllVisibleBookablesByUserId(userId: string) {
    return await this.prisma.bookable.findMany({
      where: {
        visible: true,
        hostId: userId,
      },
    });
  }

  async getBookableDetails(id: string) {
    const { bookedSlots, availableSlots, ...bookable } =
      await this.prisma.bookable.findUnique({
        where: {
          id,
        },
        include: {
          availableSlots: true,
          bookedSlots: true,
        },
      });

    const bookableSlots = computeBookableSlots(
      availableSlots.map((slot) => ({
        start: slot.startTime,
        end: slot.endTime,
      })),
      bookedSlots.map((slot) => ({ start: slot.startTime, end: slot.endTime })),
      bookable.duration,
    );

    // Compute the available slots

    return { ...bookable, slots: bookableSlots };
  }
}
