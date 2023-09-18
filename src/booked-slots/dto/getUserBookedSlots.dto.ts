import { Type } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

class GetUserBookedSlotsDto {
  @IsDateString()
  @IsOptional()
  @Type(() => Date)
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @Type(() => Date)
  endDate: Date;
}

export default GetUserBookedSlotsDto;
