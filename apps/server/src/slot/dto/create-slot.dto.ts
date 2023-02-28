import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSlotDto {
  @IsString()
  eventId: string;

  @IsNumber()
  availableParticipatorNum: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsBoolean()
  booking: boolean;
}
