import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookableDto } from './dto/create-bookable-dto';
import computeBookableSlots from 'src/utils/computBookableSlots';
import { ScheduleBookingDto } from './dto/schedule-booking-dto';

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
    const {
      hostId,
      checkAvailability,
      bookedSlots,
      availableSlots,
      ...bookable
    } = await this.prisma.bookable.findUnique({
      where: {
        id,
      },
      include: {
        availableSlots: true,
        bookedSlots: true,
      },
    });

    let bookedSlotsFromUser = [];

    if (checkAvailability) {
      bookedSlotsFromUser = await this.prisma.bookedSlot.findMany({
        where: {
          bookableId: id,
          user: {
            id: hostId,
          },
        },
      });
    }

    const bookableSlots = computeBookableSlots(
      availableSlots.map((slot) => ({
        start: slot.startTime,
        end: slot.endTime,
      })),
      bookedSlots
        .concat(bookedSlotsFromUser)
        .map((slot) => ({ start: slot.startTime, end: slot.endTime })),
      bookable.duration,
    );

    // Compute the available slots

    return { ...bookable, slots: bookableSlots };
  }

  async scheduleBooking(dto: ScheduleBookingDto, bookableId: string) {
    const bookable = await this.prisma.bookable.findUnique({
      where: {
        id: bookableId,
      },
    });
    //generate a booking reference code string contains 6 random characters
    const bookingReferenceCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    const booking = await this.prisma.bookedSlot.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: bookable.hostId,
          },
        },
        bookable: {
          connect: {
            id: bookableId,
          },
        },
        attendeeBookingReferenceCode: bookingReferenceCode,
      },
    });
    return booking;
  }
}
