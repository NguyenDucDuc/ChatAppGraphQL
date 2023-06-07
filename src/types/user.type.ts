import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class UserType {
  @Field({nullable: true})
  _id: string;
  
  @Field({nullable: true})
  username: string;

  @Field({nullable: true})
  fullName: string;

  @Field({nullable: true})
  password: string;

  @Field({nullable: true})
  age: string;

  @Field({nullable: true})
  avatar: string;

}