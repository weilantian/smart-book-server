import { IsDateString, IsEmail, IsString } from 'class-validator';

export class ScheduleBookingDto {
  @IsDateString()
  startTime: string;
  @IsDateString()
  endTime: string;

  @IsString()
  attendeeFirstName: string;
  @IsString()
  attendeeLastName: string;
  @IsEmail()
  attendeeEmail: string;
}
