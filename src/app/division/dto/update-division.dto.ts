import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { CreateDivisionDTO } from "./create-division.dto";

@InputType()
export class UpdateDivisionDTO extends CreateDivisionDTO {

  @Field()
  @IsNotEmpty()
  id: string;
}
