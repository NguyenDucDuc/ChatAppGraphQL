import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateConversationGroupDTO {
  @Field()
  name: string;

  @Field(type => [String!])
  members: string[]
}