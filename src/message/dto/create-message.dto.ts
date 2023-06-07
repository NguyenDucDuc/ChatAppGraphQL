import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class CreateMessageDTO {
  @Field()
  content: string;
  @Field()
  conversationId: string;
}