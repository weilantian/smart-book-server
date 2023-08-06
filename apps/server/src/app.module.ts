import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
//import { SlotModule } from './slot/slot.module';
import { IcsModule } from './ics/ics.module';
import BookableModule from './bookable/bookable.module';
import BookedSlotsModule from './booked-slots/booked-slots.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    EventModule,
    BookableModule,
    IcsModule,
    BookedSlotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
