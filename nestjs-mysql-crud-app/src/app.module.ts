import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, CompaniesModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
