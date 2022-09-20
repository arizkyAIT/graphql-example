import { Company } from '@app/company/entities/company.entity';
import { Division } from '@app/division/entities/division.entity';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => Department, { name: 'department', nullable: true })
  findOne(@Args('id') id: string) {
    return this.departmentService.findOneById(id);
  }

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.departmentService.findAll();
  }

  @ResolveField(() => Company, { name: 'company', nullable: true })
  company(@Parent() department: Department) {
    const { id } = department;
    return this.departmentService.findCompany(id);
  }

  @ResolveField(() => [Division], { name: 'divisions', nullable: true })
  divisions(@Parent() department: Department) {
    const { id } = department;
    return this.departmentService.findDivisions(id);
  }

  @Mutation(() => Department, { name: 'createDepartment' })
  async create(@Args({ name: 'params', type: () => CreateDepartmentDTO }) dto: CreateDepartmentDTO) {
    return this.departmentService.create(dto);
  }

  @Mutation(() => Department, { name: 'updateDepartment' })
  async update(@Args({ name: 'params', type: () => UpdateDepartmentDTO }) dto: UpdateDepartmentDTO) {
    return this.departmentService.update(dto);
  }

  @Mutation(() => Department, { name: 'deleteDepartment', nullable: true })
  async delete(@Args('id') id: string) {
    return this.departmentService.delete(id);
  }
}
