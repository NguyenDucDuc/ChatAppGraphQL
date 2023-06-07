import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class CreateUserDTO {
  @Field()
  username: string;

  @Field()
  fullName: string;

  @Field()
  age: number;

  @Field({nullable: true})
  avatar: string;

  @Field()
  password: string;
}