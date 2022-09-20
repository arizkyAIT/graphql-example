import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  providers: [CompanyResolver, CompanyService],
  imports: [TypeOrmModule.forFeature([Company])]
})
export class CompanyModule {}
