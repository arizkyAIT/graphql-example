import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

@InputType()
export class CreateCompanyDTO {

  @Field()
  @IsNotEmpty({ message: 'Code is required' })
  @MaxLength(5, { message: 'Code is to long. Max length of Code is 5' })
  code: string;

  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name is to long. Max length of Name is 100' })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  address: string;
}


@InputType()
export class PaginationDTO {

  @Field()
  limit: number;

  @Field()
  skip: number;
}