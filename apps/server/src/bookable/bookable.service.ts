import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookableDto } from './dto/create-bookable-dto';

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
      },
    });
  }
}
