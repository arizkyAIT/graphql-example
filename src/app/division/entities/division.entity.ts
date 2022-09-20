import { Company } from '@app/company/entities/company.entity';
import { Department } from '@app/department/entities/department.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('divisions')
@ObjectType()
export class Division {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Column({ name: 'code', type: 'varchar', nullable: true, default: '', length: 5 })
  @Field({ nullable: true })
  code: string;

  @Column({ name: 'name', type: 'varchar', nullable: true, default: '', length: 100 })
  @Field({ nullable: true })
  name: string;

  @ManyToOne(() => Department, department => department.divisions)
  @JoinColumn({ name: 'department_id' })
  @Field(() => Department, { nullable: true })
  department: Department;

  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_at', nullable: true })
  created_at: string;

  @Field({ nullable: true })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: string;

}
