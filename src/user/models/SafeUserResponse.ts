import { ApiProperty } from '@nestjs/swagger';

class SafeUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export default SafeUser;
