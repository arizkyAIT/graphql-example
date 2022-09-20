import { CompanyService } from '@app/company/company.service';
import { Company } from '@app/company/entities/company.entity';
import { Division } from '@app/division/entities/division.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department) private departmentRepository: Repository<Department>,
    private companyService: CompanyService,
  ) { }

  findAll(options: FindManyOptions<Department> = null): Promise<Department[]> {
    return this.departmentRepository.find(options);
  }

  findOne(options: FindOneOptions<Department>): Promise<Department> {
    return this.departmentRepository.findOne(options);
  }

  async findOneById(id: string): Promise<Department> {
    const department = await this.findOne({ 
      where: { id } 
    });
    if (!department) throw new Error(`Department with id: ${id} is not exist`);
    return department;
  }

  async findCompany(departmentId: string): Promise<Company> {
    const department = await this.findOne({
      where: { id: departmentId },
      relations: ['company'],
    });
    return department.company;
  }

  async findDivisions(departmentId: string): Promise<Division[]> {
    const company = await this.findOne({
      where: { id: departmentId },
      relations: ['divisions'],
    });
    return company.divisions;
  }

  async create(createDepartmentDTO: CreateDepartmentDTO): Promise<Department> {
    const departmentCode = await this.findOne({ 
      where: { code: createDepartmentDTO.code } 
    });
    if (departmentCode) throw new Error(`Department with code: ${departmentCode.code} is already exist`);

    const company = await this.companyService.findOneById(createDepartmentDTO.company_id);

    const department = new Department;
    department.code = createDepartmentDTO.code;
    department.name = createDepartmentDTO.name;
    department.company = company;
    
    await this.departmentRepository.save(department);
    return department;
  }

  async update(updateDepartmentDTO: UpdateDepartmentDTO): Promise<Department> {
    const department = await this.findOneById(updateDepartmentDTO.id);
    const departmentCode = await this.findOne({ 
      where: {
        id: Not(updateDepartmentDTO.id),
        code: updateDepartmentDTO.code,
      },
    });
    if (departmentCode) throw new Error(`Department with code: ${updateDepartmentDTO.code} is already exist`);

    const company = await this.companyService.findOneById(updateDepartmentDTO.company_id);

    department.code = updateDepartmentDTO.code;
    department.name = updateDepartmentDTO.name;
    department.company = company;
    await this.departmentRepository.save(department);
    return department;
  }

  async delete(id: string): Promise<Department> {
    const department = await this.findOneById(id);
    await this.departmentRepository.softDelete({ id });
    return department;
  }
}
