import { Department } from '@app/department/entities/department.entity';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DivisionService } from './division.service';
import { CreateDivisionDTO } from './dto/create-division.dto';
import { UpdateDivisionDTO } from './dto/update-division.dto';
import { Division } from './entities/division.entity';

@Resolver(() => Division)
export class DivisionResolver {
  constructor(private readonly divisionService: DivisionService) {}

  @Query(() => Division, { name: 'division', nullable: true })
  findOne(@Args('id') id: string) {
    return this.divisionService.findOneById(id);
  }

  @Query(() => [Division], { name: 'divisions' })
  findAll() {
    return this.divisionService.findAll();
  }

  @ResolveField(() => Department, { name: 'department', nullable: true })
  department(@Parent() division: Division) {
    const { id } = division;
    return this.divisionService.findDepartment(id);
  }

  @Mutation(() => Division, { name: 'createDivision' })
  async create(@Args({ name: 'params', type: () => CreateDivisionDTO }) dto: CreateDivisionDTO) {
    return this.divisionService.create(dto);
  }

  @Mutation(() => Division, { name: 'updateDivision' })
  async update(@Args({ name: 'params', type: () => UpdateDivisionDTO }) dto: UpdateDivisionDTO) {
    return this.divisionService.update(dto);
  }

  @Mutation(() => Division, { name: 'deleteDivision', nullable: true })
  async delete(@Args('id') id: string) {
    return this.divisionService.delete(id);
  }
}
