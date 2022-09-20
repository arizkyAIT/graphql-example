import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class CreateDivisionDTO {

  @Field()
  @IsNotEmpty({ message: 'Code is required' })
  @MaxLength(5, { message: 'Code is to long. Max length of Code is 5' })
  code: string;

  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name is to long. Max length of Name is 100' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Department id is required' })
  department_id: string;
}
