import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSlotDto {
  @IsString()
  eventId: string;

  @IsNumber()
  availableParticipatorNum: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsBoolean()
  booking: boolean;
}
