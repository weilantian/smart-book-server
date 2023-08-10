import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class ScheduleBookingDto {
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

  @IsString()
  @ApiProperty({
    example: 'John',
  })
  attendeeFirstName: string;
  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  attendeeLastName: string;

  @ApiProperty()
  @IsEmail()
  attendeeEmail: string;
}
