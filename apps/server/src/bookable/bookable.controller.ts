import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookableService } from './bookable.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateBookableDto } from './dto/create-bookable-dto';

@Controller('bookable')
export class BookableController {
  constructor(private bookableService: BookableService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createBookable(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookableDto,
  ) {
    return await this.bookableService.createBookable(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Get('/:userId')
  async getAllVisibleBookablesByUserId(@Param('userId') userId: string) {
    return await this.bookableService.getAllVisibleBookablesByUserId(userId);
  }
}
