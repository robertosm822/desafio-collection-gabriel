import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { Users } from '@/api/user/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<Users | never> {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<Users>user);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: Users,
  ): Observable<UpdateResult> {
    return this.service.updateUser(id, user);
  }
}
