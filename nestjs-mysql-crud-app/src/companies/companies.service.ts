import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompaniesEntity } from './companies.entity';
import { companiesDTO } from './companies.dto';

@Injectable()
export class CompaniesService {
    constructor(
      @InjectRepository(CompaniesEntity)
        private companiesRepository: Repository<CompaniesEntity>,
      ) {}
    
      async showAll() {
        return await this.companiesRepository.find();
      }
    
      async create(companies: CompaniesEntity) {
        return await this.companiesRepository.save(companies);
      }

      async readById(id:number){
          return await this.companiesRepository.findOne({id});
      }

    
      async delete(id: number) {
        return await this.companiesRepository.delete({ id });
      }
}
