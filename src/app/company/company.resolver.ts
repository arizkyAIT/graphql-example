import { Department } from '@app/department/entities/department.entity';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CreateCompanyDTO, PaginationDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { Company, CompanyPagination } from './entities/company.entity';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) { }

  @Query(() => Company, { name: 'company', nullable: true })
  findOne(@Args('id') id: string) {
    return this.companyService.findOneById(id);
    // const data = [
    //   {
    //     "id": "1",
    //     "code": "COM01",
    //     "name": "PT. Akar Inti Teknologi 1",
    //     "address": "Atri@Sudirman Lt.20"
    //   },
    //   {
    //     "id": "2",
    //     "code": "COM02",
    //     "name": "PT. Akar Inti Teknologi 2",
    //     "address": "Atri@Sudirman Lt.20"
    //   },
    //   {
    //     "id": "3",
    //     "code": "COM03",
    //     "name": "PT. Akar Inti Teknologi 3",
    //     "address": "Atri@Sudirman Lt.20"
    //   }
    // ];
    // return data.filter(item => item.id === id)[0];
  }

  @Query(() => CompanyPagination, { name: 'companies' })
  async findAll(@Args({ name: 'pagination', type: () => PaginationDTO }) pagination: PaginationDTO) {
    const companies = await this.companyService.findAll({
      skip: pagination.skip,
      take: pagination.limit,
    });
    return {
      total: companies.length,
      currentPage: pagination.skip + 1,
      data: companies,
    }
  }

  @ResolveField(() => [Department], { name: 'departments', nullable: true })
  departments(@Parent() company: Company) {
    const { id } = company;
    return this.companyService.findDepartments(id);
  }

  @ResolveField(() => String, { name: 'created_at', nullable: true })
  createdAt() {
    return 'Hallo';
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
