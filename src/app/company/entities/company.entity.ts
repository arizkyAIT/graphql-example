import { Department } from '@app/department/entities/department.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('companies')
@ObjectType()
export class Company {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Column({ name: 'code', type: 'varchar', nullable: true, default: '', length: 5 })
  @Field({ nullable: true })
  code: string;

  @Column({ name: 'name', type: 'varchar', nullable: true, default: '', length: 100 })
  @Field({ nullable: true })
  name: string;

  @Column({ name: 'address', type: 'text', nullable: true, default: '' })
  @Field({ nullable: true })
  address: string;

  @OneToMany(() => Department, department => department.company, { nullable: true })
  @Field(() => [Department], { nullable: true })
  departments: Department[];

  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_at', nullable: true })
  created_at: string;

  @Field({ nullable: true })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: string;

}


@ObjectType()
export class CompanyPagination {

  @Field()
  total: number;

  @Field()
  currentPage: number;

  @Field(() => [Company])
  data: Company[];
}