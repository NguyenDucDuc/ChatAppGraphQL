import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginType {
  @Field({nullable: true})
  _id: string;

  @Field({nullable: true})
  username: string;

  @Field({nullable: true})
  age: number;

  @Field({nullable: true})
  fullName: string;

  @Field({nullable: true})
  avatar: string;

  @Field({nullable: true})
  accessToken: string;
}