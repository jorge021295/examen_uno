import { CompaniesEntity } from 'src/companies/companies.entity';
import { UsersEntity } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('person')
export class PersonEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({name:"first_name"})
  firstName: string;

  @Column({name:"last_name"})
  lastName: string;

  @Column({name:"created_at"})
  createdAt: Date;

  @Column({name:"updated_at"})
  updatedAt: Date;

  @ManyToOne(type=>CompaniesEntity,companie=>companie.person,{eager:true})
  @JoinColumn({name:"company_id"})
  companie: CompaniesEntity;

  @ManyToOne(type=>UsersEntity,user=>user.person,{eager:true})
  @JoinColumn({name:"user_id"})
  user: UsersEntity;

}