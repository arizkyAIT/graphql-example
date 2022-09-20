import { Department } from '@app/department/entities/department.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) { }

  findAll(options: FindManyOptions<Company> = null): Promise<Company[]> {
    return this.companyRepository.find(options);
  }

  findOne(options: FindOneOptions<Company>): Promise<Company> {
    return this.companyRepository.findOne(options);
  }

  async findOneById(id: string): Promise<Company> {
    const company = this.companyRepository.findOne({ where: { id } });
    if (!company) throw new Error(`Company with id: ${id} is not exist`);
    return company;
  }

  async findDepartments(companyId: string): Promise<Department[]> {
    const company = await this.findOne({
      where: { id: companyId },
      relations: ['departments'],
    });
    return company.departments;
  }

  async create(createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    const companyCode = await this.findOne({ 
      where: { code: createCompanyDTO.code } 
    });
    if (companyCode) throw new Error(`Company with code: ${createCompanyDTO.code} is already exist`);

    const company = new Company;
    company.code = createCompanyDTO.code;
    company.name = createCompanyDTO.name;
    company.address = createCompanyDTO.address;
    await this.companyRepository.save(company);
    return company;
  }

  async update(updateCompanyDTO: UpdateCompanyDTO): Promise<Company> {
    const company = await this.findOneById(updateCompanyDTO.id);
    const companyCode = await this.findOne({ 
      where: {
        id: Not(updateCompanyDTO.id),
        code: updateCompanyDTO.code,
      },
    });
    if (companyCode) throw new Error(`Company with code: ${updateCompanyDTO.code} is already exist`);

    company.code = updateCompanyDTO.code;
    company.name = updateCompanyDTO.name;
    company.address = updateCompanyDTO.address;
    await this.companyRepository.save(company);
    return company;
  }

  async delete(id: string): Promise<Company> {
    const company = await this.findOneById(id);
    await this.companyRepository.softDelete({ id });
    return company;
  }
}
