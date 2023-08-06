import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';

class AvailableSlotDto {
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

export class CreateBookableDto {
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

  @IsEnum(['ONE_TIME', 'RECURRING'])
  @ApiProperty({
    enum: ['ONE_TIME', 'RECURRING'],
  })
  type: 'ONE_TIME' | 'RECURRING';
}
