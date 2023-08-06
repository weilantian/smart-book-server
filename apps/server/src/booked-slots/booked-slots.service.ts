import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookedSlotsService {
  constructor(private prisma: PrismaService) {}
  async getAllBookedSlotsByUserId(userId: string) {
    return await this.prisma.bookedSlot.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
