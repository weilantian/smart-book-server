import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';

class AvailableSlotDto {
  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}

export class CreateBookableDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsArray()
  availableSlots: AvailableSlotDto[];

  @IsEnum(['ONE_TIME', 'RECURRING'])
  type: 'ONE_TIME' | 'RECURRING';
}
