import { ApiProperty } from '@nestjs/swagger';

export class BookableDetailResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  slots: Array<string>;
}
