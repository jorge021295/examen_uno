import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PersonEntity } from './person.entity';

@Injectable()
export class PersonService {
    constructor(
      @InjectRepository(PersonEntity)
        private personRepository: Repository<PersonEntity>,
      ) {}
    
      async showAll() {
        return await this.personRepository.find();
      }
    
      async create(person: PersonEntity) {
        return await this.personRepository.save(person);
      }

      async readById(id:number){
          return await this.personRepository.findOne({id});
      }

    
      async delete(id: number) {
        return await this.personRepository.delete({ id });
      }
}
