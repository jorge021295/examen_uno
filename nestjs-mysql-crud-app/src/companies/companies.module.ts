import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { CompanieController } from './companies.controller';
import { CompaniesEntity } from './companies.entity';


@Module({
    imports: [TypeOrmModule.forFeature([CompaniesEntity])],
    controllers: [CompanieController],
    providers: [CompaniesService],
})
export class CompaniesModule {}
