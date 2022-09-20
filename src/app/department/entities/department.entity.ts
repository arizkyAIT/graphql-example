import { Company } from '@app/company/entities/company.entity';
import { Division } from '@app/division/entities/division.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('departments')
@ObjectType()
export class Department {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Column({ name: 'code', type: 'varchar', nullable: true, default: '', length: 5 })
  @Field({ nullable: true })
  code: string;

  @Column({ name: 'name', type: 'varchar', nullable: true, default: '', length: 100 })
  @Field({ nullable: true })
  name: string;

  @ManyToOne(() => Company, country => country.departments)
  @JoinColumn({ name: 'company_id' })
  @Field(() => Company, { nullable: true })
  company: Company;

  @OneToMany(() => Division, divisions => divisions.department, { nullable: true })
  @Field(() => [Division], { nullable: true })
  divisions: Division[];

  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_at', nullable: true })
  created_at: string;

  @Field({ nullable: true })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: string;

}
