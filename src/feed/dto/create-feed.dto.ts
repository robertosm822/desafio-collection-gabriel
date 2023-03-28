import { ApiProperty } from '@nestjs/swagger';
export class CreateFeedDto {
  @ApiProperty({
    example: '1',
    description: `Identificador único.`,
  })
  id: number;
  @ApiProperty()
  body: string;
  @ApiProperty()
  createdAt: Date;
}
