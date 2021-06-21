import { Controller,Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { PersonService } from './person.service';
import { personDTO } from './person.dto';
import { PersonEntity } from './person.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';

@Controller('person')
export class PersonController {
    constructor(private personService: PersonService, 
        private companieService:CompaniesService,
        private userService: UsersService) {}

  @Get()
  async showAllCompanies() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.personService.showAll(),
    };
  }

  @Post()
  async createPerson(@Body() data: personDTO) {
      if(!data.firstName){return{ statusCode:HttpStatus.BAD_REQUEST, message: "firstName is required"}}
      if(!data.name){return{ statusCode:HttpStatus.BAD_REQUEST, message: "name is required"}}
      if(!data.userId){return{ statusCode:HttpStatus.BAD_REQUEST, message: "userId is required"}}
      if(!data.companieId){return{ statusCode:HttpStatus.BAD_REQUEST, message: "companieId is required"}}
      let user:UsersEntity = await this.userService.read(data.userId);
      if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
      let companie:CompaniesEntity = await this.companieService.readById(data.companieId);
      if(!companie){return{ statusCode:HttpStatus.NOT_FOUND, message: "companie not found"}}
      let person:PersonEntity = new PersonEntity();
      person.name = data.name;
      person.firstName = data.firstName;
      person.lastName = data.lastName;
      person.companie = companie;
      person.user = user;
      person.createdAt = new Date();
      await this.personService.create(person)
    return {
      statusCode: HttpStatus.OK,
      message: 'companie added successfully'
    };
  }

  @Get(':id')
  async readPerson(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let person:PersonEntity = await this.personService.readById(id);
    if(!person){return{ statusCode:HttpStatus.NOT_FOUND, message: "person not found"}}
    return {
      statusCode: HttpStatus.OK,
      data: person,
    };
  }

  @Put(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: personDTO) {
    let person:PersonEntity = await this.personService.readById(id);
    if(!person){return{ statusCode:HttpStatus.NOT_FOUND, message: "person not found"}}
    let user:UsersEntity;
    let companie:CompaniesEntity;
    if(data.userId){
        user = await this.userService.read(data.userId);
        if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
    }else{return{ statusCode:HttpStatus.BAD_REQUEST, message: "userId is required"}}
    if(data.companieId){
        companie = await this.companieService.readById(data.companieId);
        if(!companie){return{ statusCode:HttpStatus.NOT_FOUND, message: "companie not found"}}
    }else{return{ statusCode:HttpStatus.BAD_REQUEST, message: "companieId is required"}}
    
    person.name = data.name;
    person.firstName = data.firstName;
    person.lastName = data.lastName;
    person.companie = companie;
    person.user = user;
    person.updatedAt = new Date();
    await this.personService.create(person)
    return {
      statusCode: HttpStatus.OK,
      message: 'person update successfully'
    };
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let person:PersonEntity = await this.personService.readById(id);
    if(!person){return{ statusCode:HttpStatus.NOT_FOUND, message: "person not found"}}
    await this.personService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      data: 'person deleted successfully',
    };
  }
}
