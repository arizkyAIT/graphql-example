import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { CreateCompanyDTO } from "./create-company.dto";

@InputType()
export class UpdateCompanyDTO extends CreateCompanyDTO {

  @Field()
  @IsNotEmpty()
  id: string;
}
