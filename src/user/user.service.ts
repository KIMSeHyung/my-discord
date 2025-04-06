import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findUser({ name }) {
    return this.userRepository.findOne({ name });
  }

  async createUser(name: string) {
    const user = new User(name);
    await this.em.persistAndFlush(user);
    return user;
  }
}
