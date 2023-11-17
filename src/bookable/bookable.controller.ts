import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookableService } from './bookable.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateUpdateBookableDto } from './dto/create-bookable-dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ScheduleBookingDto } from './dto/schedule-booking-dto';

@Controller('bookable')
@UseInterceptors(CacheInterceptor)
@ApiBearerAuth()
export class BookableController {
  constructor(private bookableService: BookableService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createBookable(
    @GetUser('id') userId: string,
    @Body() dto: CreateUpdateBookableDto,
  ) {
    return await this.bookableService.createBookable(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Get('/user')
  async getCurrentUserBookables(@GetUser('id') userId: string) {
    return await this.bookableService.getAllVisibleBookablesByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/user/:userId')
  async getAllVisibleBookablesByUserId(@GetUser('id') userId: string) {
    return await this.bookableService.getAllVisibleBookablesByUserId(userId);
  }

  @Get('/:id')
  async getBookable(@Param('id') id: string) {
    return await this.bookableService.getBookable(id);
  }

  @UseGuards(JwtGuard)
  @Get('/:id/details')
  async getBookableDetails(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ) {
    return await this.bookableService.getBookableDetails(id, userId);
  }

  @UseGuards(JwtGuard)
  @Post('/:id/')
  async updateBookable(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: CreateUpdateBookableDto,
  ) {
    return await this.bookableService.updateBookable(id, dto, userId);
  }

  @Post('/:id/book')
  async scheduleBooking(
    @Body() dto: ScheduleBookingDto,
    @Param('id') id: string,
  ) {
    return await this.bookableService.scheduleBooking(dto, id);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteBookable(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.bookableService.deleteBookable(id, userId);
  }
}
