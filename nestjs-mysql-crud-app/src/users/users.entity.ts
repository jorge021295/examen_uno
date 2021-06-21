import { PersonEntity } from 'src/person/person.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UsersEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({name:"system_status"})
  systemStatus: string;

  @Column({name:"confirmation_code"})
  confirmationCode: string;

  @Column({name:"confirmed_at"})
  confirmedAt: Date;

  @Column({name:"accepted_conditions_at"})
  acceptedConditionsAt: Date;
  
  @Column({name:"created_at"})
  createdAt: Date;

  @Column({name:"updated_at"})
  updatedAt: Date;

  @Column({name:"registration_method"})
  registrationMethod: string;

  @Column()
  token: string;

  @Column({name:"recovery_password_code"})
  recoveryPasswordCode: string;

  @OneToMany(type=> PersonEntity,person=>person.user)
  person:PersonEntity[];

}