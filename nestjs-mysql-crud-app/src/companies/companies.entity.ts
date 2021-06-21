import { PersonEntity } from 'src/person/person.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('companies')
export class CompaniesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"legal_name"})
  legalName: string;

  @Column({name:"short_name"})
  shortName: string;

  @Column({name:"account_name"})
  accountName: string;

  @Column()
  logo: string;

  @Column()
  cover: string;

  @Column({name:"created_at"})
  createdAt: Date;

  @Column({name:"updated_at"})
  updatedAt: Date;

  @OneToMany(type=> PersonEntity,person=>person.companie)
  person:PersonEntity[];

}