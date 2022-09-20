import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionResolver } from './division.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entities/division.entity';
import { Department } from '@app/department/entities/department.entity';
import { DepartmentService } from '@app/department/department.service';
import { Company } from '@app/company/entities/company.entity';
import { CompanyService } from '@app/company/company.service';

@Module({
  providers: [DivisionResolver, DivisionService, DepartmentService, CompanyService],
  imports: [TypeOrmModule.forFeature([Division, Department, Company])]
})
export class DivisionModule {}
