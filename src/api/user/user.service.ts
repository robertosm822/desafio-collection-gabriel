import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<Users> {
    const user: Users = <Users>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }
}
