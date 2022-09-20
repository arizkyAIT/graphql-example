import { Department } from '@app/department/entities/department.entity';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => Company, { name: 'company', nullable: true })
  findOne(@Args('id') id: string) {
    return this.companyService.findOneById(id);
  }

  @Query(() => [Company], { name: 'companies' })
  findAll() {
    return this.companyService.findAll();
  }

  @ResolveField(() => [Department], { name: 'departments', nullable: true })
  departments(@Parent() company: Company) {
    const { id } = company;
    return this.companyService.findDepartments(id);
  }

  @Mutation(() => Company, { name: 'createCompany' })
  async create(@Args({ name: 'params', type: () => CreateCompanyDTO }) dto: CreateCompanyDTO) {
    return this.companyService.create(dto);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  async update(@Args({ name: 'params', type: () => UpdateCompanyDTO }) dto: UpdateCompanyDTO) {
    return this.companyService.update(dto);
  }

  @Mutation(() => Company, { name: 'deleteCompany', nullable: true })
  async delete(@Args('id') id: string) {
    return this.companyService.delete(id);
  }
}
