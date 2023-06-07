import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateConversationDTO {
  @Field(type => [String])
  members: string[];
}