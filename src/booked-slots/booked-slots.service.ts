import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';
import GetUserBookedSlotsDto from './dto/getUserBookedSlots.dto';

@Injectable()
export class BookedSlotsService {
  constructor(private prisma: PrismaService) {}
  async getAllBookedSlotsByUserId(dto: GetUserBookedSlotsDto, userId: string) {
    return await this.prisma.bookedSlot.findMany({
      where: {
        userId: userId,
        startTime: {
          gte: dto.startDate,
        },
        endTime: {
          lte: dto.endDate,
        },
      },
      include: {
        bookable: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async signBookingManagementToken(
    bookingReferenceCode: string,
    attendeeLastName: string,
  ) {
    const booking = await this.prisma.bookedSlot.findFirstOrThrow({
      where: {
        attendeeBookingReferenceCode: bookingReferenceCode,
        attendeeLastName,
      },
    });
    // Generate a management token for the booking
    // This token will be used to cancel the booking
    // and to check-in the attendee
    const token = crypto.randomBytes(64).toString('hex');

    const bookingWithNewToken = await this.prisma.bookedSlot.update({
      where: {
        id: booking.id,
      },
      data: {
        attendeeBookingManagementToken: token,
      },
    });
    return bookingWithNewToken.attendeeBookingManagementToken;
  }

  async invalidateBookingManagementToken(bookingId: string, token: string) {
    await this.prisma.bookedSlot.update({
      where: {
        id: bookingId,
      },
      data: {
        attendeeBookingManagementToken: null,
      },
    });
  }
}
