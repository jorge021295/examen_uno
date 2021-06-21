import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
      ) {}
    
      async showAll() {
        return await this.usersRepository.find();
      }
    
      async create(data: UsersEntity) {
        return await this.usersRepository.save(data);
      }
    
    
      async read(id: number) {
        return await this.usersRepository.findOne({ where: { id: id } });
      }
    
    
      async delete(id: number) {
        return await this.usersRepository.delete({ id });
      }
}
