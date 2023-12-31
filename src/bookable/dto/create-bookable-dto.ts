import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

class AvailableSlotDto {
  id?: string;

  @ApiProperty({
    format: 'date-time',
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({
    format: 'date-time',
  })
  @IsDateString()
  endTime: string;
}

export class CreateUpdateBookableDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsArray()
  @ApiProperty({
    type: [AvailableSlotDto],
  })
  availableSlots: AvailableSlotDto[];

  @IsNumber()
  duration: number;

  @IsEnum(['ONE_TIME', 'RECURRING'])
  @ApiProperty({
    enum: ['ONE_TIME', 'RECURRING'],
  })
  type: 'ONE_TIME' | 'RECURRING';
}
