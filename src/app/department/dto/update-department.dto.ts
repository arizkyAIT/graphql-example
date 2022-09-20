import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { CreateDepartmentDTO } from "./create-department.dto";

@InputType()
export class UpdateDepartmentDTO extends CreateDepartmentDTO {

  @Field()
  @IsNotEmpty()
  id: string;
}
