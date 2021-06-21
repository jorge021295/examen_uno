import { Controller,Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { companiesDTO, updateCompaniesDTO } from './companies.dto';
import { CompaniesEntity } from './companies.entity';

@Controller('companie')
export class CompanieController {
    constructor(private companiesService: CompaniesService) {}

  @Get()
  async showAllCompanies() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.companiesService.showAll(),
    };
  }

  @Post()
  async createCompanies(@Body() data: companiesDTO) {
      if(!data.accountName){return{ statusCode:HttpStatus.BAD_REQUEST, message: "accountName is required"}}
      if(!data.cover){return{ statusCode:HttpStatus.BAD_REQUEST, message: "cover is required"}}
      if(!data.legalName){return{ statusCode:HttpStatus.BAD_REQUEST, message: "legalName is required"}}
      if(!data.logo){return{ statusCode:HttpStatus.BAD_REQUEST, message: "logo is required"}}
      if(!data.shortName){return{ statusCode:HttpStatus.BAD_REQUEST, message: "shortName is required"}}
      let companies:CompaniesEntity = new CompaniesEntity();
      companies.accountName = data.accountName;
      companies.cover = data.cover;
      companies.legalName = data.legalName;
      companies.logo = data.logo;
      companies.shortName = data.shortName;
      companies.createdAt = new Date();
      await this.companiesService.create(companies)
    return {
      statusCode: HttpStatus.OK,
      message: 'companie added successfully'
    };
  }

  @Get(':id')
  async readCompanie(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let companies:CompaniesEntity = await this.companiesService.readById(id);
    if(!companies){return{ statusCode:HttpStatus.NOT_FOUND, message: "companie not found"}}
    return {
      statusCode: HttpStatus.OK,
      data: companies,
    };
  }

  @Put(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: updateCompaniesDTO) {
    let companies:CompaniesEntity = await this.companiesService.readById(id);
    if(!companies){return{ statusCode:HttpStatus.NOT_FOUND, message: "companie not found"}}
    companies.accountName = data.accountName;
    companies.cover = data.cover;
    companies.legalName = data.legalName;
    companies.logo = data.logo;
    companies.shortName = data.shortName;
    companies.updatedAt = new Date();
    await this.companiesService.create(companies)
    return {
      statusCode: HttpStatus.OK,
      message: 'companie update successfully'
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let companies:CompaniesEntity = await this.companiesService.readById(id);
    if(!companies){return{ statusCode:HttpStatus.NOT_FOUND, message: "companie not found"}}
    await this.companiesService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      data: 'companie deleted successfully',
    };
  }
}
