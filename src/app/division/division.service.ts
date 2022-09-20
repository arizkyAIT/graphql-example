import { DepartmentService } from '@app/department/department.service';
import { Department } from '@app/department/entities/department.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import { CreateDivisionDTO } from './dto/create-division.dto';
import { UpdateDivisionDTO } from './dto/update-division.dto';
import { Division } from './entities/division.entity';

@Injectable()
export class DivisionService {

  constructor(
    @InjectRepository(Division) private divisionRepository: Repository<Division>,
    private departmentService: DepartmentService,
  ) { }

  findAll(options: FindManyOptions<Division> = null): Promise<Division[]> {
    return this.divisionRepository.find(options);
  }

  findOne(options: FindOneOptions<Division>): Promise<Division> {
    return this.divisionRepository.findOne(options);
  }

  async findOneById(id: string): Promise<Division> {
    const division = await this.findOne({
      where: { id }
    });
    if (!division) throw new Error(`Division with id: ${id} is not exist`);
    return division;
  }

  async findDepartment(departmentId: string): Promise<Department> {
    const division = await this.findOne({
      where: { id: departmentId },
      relations: ['department'],
    });
    return division.department;
  }

  async create(createDivisionDTO: CreateDivisionDTO): Promise<Division> {
    const divisionCode = await this.findOne({
      where: { code: createDivisionDTO.code }
    });
    if (divisionCode) throw new Error(`Division with code: ${divisionCode.code} is already exist`);

    const department = await this.departmentService.findOneById(createDivisionDTO.department_id);

    const division = new Division;
    division.code = createDivisionDTO.code;
    division.name = createDivisionDTO.name;
    division.department = department;

    await this.divisionRepository.save(division);
    return division;
  }

  async update(updateDivisionDTO: UpdateDivisionDTO): Promise<Division> {
    const division = await this.findOneById(updateDivisionDTO.id);
    const divisionCode = await this.findOne({
      where: {
        id: Not(updateDivisionDTO.id),
        code: updateDivisionDTO.code,
      },
    });
    if (divisionCode) throw new Error(`Division with code: ${updateDivisionDTO.code} is already exist`);

    const department = await this.departmentService.findOneById(updateDivisionDTO.department_id);

    division.code = updateDivisionDTO.code;
    division.name = updateDivisionDTO.name;
    division.department = department;
    await this.divisionRepository.save(division);
    return division;
  }

  async delete(id: string): Promise<Division> {
    const division = await this.findOneById(id);
    await this.divisionRepository.softDelete({ id });
    return division;
  }
}
