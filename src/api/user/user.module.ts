import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { ApiTags } from '@nestjs/swagger';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
