import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Company } from '@app/company/entities/company.entity';
import { CompanyService } from '@app/company/company.service';

@Module({
  providers: [DepartmentResolver, DepartmentService, CompanyService],
  imports: [TypeOrmModule.forFeature([Department, Company])]
})
export class DepartmentModule {}
