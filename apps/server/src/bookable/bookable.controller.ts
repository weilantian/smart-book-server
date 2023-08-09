import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookableService } from './bookable.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateBookableDto } from './dto/create-bookable-dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BookableDetailResponseDto } from './dto/bookable-response-dto';

@Controller('bookable')
@UseInterceptors(CacheInterceptor)
@ApiBearerAuth()
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
  @Get('/user/:userId')
  async getAllVisibleBookablesByUserId(@Param('userId') userId: string) {
    return await this.bookableService.getAllVisibleBookablesByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getBookableDetails(@Param('id') id: string) {
    return await this.bookableService.getBookableDetails(id);
  }
}
