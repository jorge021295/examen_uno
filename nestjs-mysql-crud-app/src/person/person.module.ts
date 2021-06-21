import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonEntity } from './person.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { UsersEntity } from 'src/users/users.entity';


@Module({
    imports: [TypeOrmModule.forFeature([PersonEntity,CompaniesEntity,UsersEntity])],
    controllers: [PersonController],
    providers: [PersonService,CompaniesService,UsersService],
})
export class PersonModule {}
