import { HttpException, Injectable } from '@nestjs/common';
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
    try {
      const {
        hostId,
        checkAvailability,
        bookedSlots,
        availableSlots,
        ...bookable
      } = await this.prisma.bookable.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          availableSlots: true,
          bookedSlots: true,
        },
      });

      let bookedSlotsFromUser = [];

      const targetDate = new Date();
      targetDate.setHours(0, 0, 0, 0);

      if (checkAvailability) {
        bookedSlotsFromUser = await this.prisma.bookedSlot.findMany({
          where: {
            startTime: {
              gte: targetDate,
            },
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
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Bookable not found', 404);
      }
      throw error;
    }
  }

  async scheduleBooking(dto: ScheduleBookingDto, bookableId: string) {
    const { checkAvailability, bookedSlots, availableSlots, ...bookable } =
      await this.prisma.bookable.findUnique({
        where: {
          id: bookableId,
        },
        include: {
          availableSlots: true,
          bookedSlots: true,
        },
      });

    // Check if the email is already used for this bookable

    const isEmailUsed = await this.prisma.bookedSlot.findFirst({
      where: {
        bookableId,
        attendeeEmail: dto.attendeeEmail,
      },
    });

    if (isEmailUsed) {
      throw new HttpException(
        'The email is already used for this bookable',
        400,
      );
    }

    // Check if the bookable is still available
    let bookedSlotsFromUser = [];

    if (checkAvailability) {
      bookedSlotsFromUser = await this.prisma.bookedSlot.findMany({
        where: {
          user: {
            id: bookable.hostId,
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

    const isSlotAvailable = bookableSlots.some(
      (slot) =>
        new Date(slot.start).getTime() === new Date(dto.startTime).getTime() &&
        new Date(slot.end).getTime() === new Date(dto.endTime).getTime(),
    );

    if (!isSlotAvailable) {
      throw new HttpException('The slot is not available', 400);
    }

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
