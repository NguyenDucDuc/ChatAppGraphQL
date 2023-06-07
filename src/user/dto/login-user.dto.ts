import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserDTO {
  @Field()
  username: string;
  @Field()
  password: string;
}