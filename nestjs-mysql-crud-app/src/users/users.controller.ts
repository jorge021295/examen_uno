import { Controller,Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';
import { UsersEntity } from './users.entity';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

  @Get()
  async showAllUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.showAll(),
    };
  }

  @Post()
  async createUsers(@Body() data: UsersDTO) {
    if(!data.email){return{ statusCode:HttpStatus.BAD_REQUEST, message: "email is required"}}
    if(!data.password){return{ statusCode:HttpStatus.BAD_REQUEST, message: "password is required"}}
    if(!data.registrationMethod){return{ statusCode:HttpStatus.BAD_REQUEST, message: "registrationMethod is required"}}
    if(!data.systemStatus){return{ statusCode:HttpStatus.BAD_REQUEST, message: "systemStatus is required"}}
    let user:UsersEntity = new UsersEntity();
    user.email = data.email;
    user.password = data.password;
    user.recoveryPasswordCode = data.registrationMethod;
    user.systemStatus = data.systemStatus;
    user.createdAt = new Date();
    await this.usersService.create(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User added successfully',
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let user:UsersEntity = await this.usersService.read(id);
    if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }


  @Put(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: UsersDTO) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let user:UsersEntity = await this.usersService.read(id);
    if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
    user.email = data.email;
    user.password = data.password;
    user.recoveryPasswordCode = data.registrationMethod;
    user.systemStatus = data.systemStatus;
    user.updatedAt = new Date();
    await this.usersService.create(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User update successfully',
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Body() data: UsersDTO) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let user:UsersEntity = await this.usersService.read(id);
    if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
    await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @Put('confirm/:id')
  async confirm(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let user:UsersEntity = await this.usersService.read(id);
    if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
    user.confirmationCode = await this.makeid(8);
    user.confirmedAt = new Date();
    await this.usersService.create(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User confirm successfully',
    };
  }

  @Put('accepted/:id')
  async accepted(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let user:UsersEntity = await this.usersService.read(id);
    if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
    user.acceptedConditionsAt = new Date();
    await this.usersService.create(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User accepted successfully',
    };
  }

  @Put('recovery/:id')
  async recovery(@Param('id') id: number) {
    if(!id){return{ statusCode:HttpStatus.BAD_REQUEST, message: "id is required"}}
    let user:UsersEntity = await this.usersService.read(id);
    if(!user){return{ statusCode:HttpStatus.NOT_FOUND, message: "user not found"}}
    user.recoveryPasswordCode = await this.makeid(8);
    await this.usersService.create(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User recovery successfully',
    };
  }

  makeid(length : number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
