import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    delete user.password;
    const { password, createdAt, updatedAt, ...safeUserData } = user;
    return safeUserData;
  }
}
