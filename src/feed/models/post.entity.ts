/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
@Entity('feed_post')
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ default: '' })
  @ApiProperty()
  body: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;
}
