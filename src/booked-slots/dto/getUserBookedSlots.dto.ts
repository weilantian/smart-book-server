import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

class GetUserBookedSlotsDto {
  @IsOptional()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @Type(() => Date)
  endDate: Date;
}

export default GetUserBookedSlotsDto;
