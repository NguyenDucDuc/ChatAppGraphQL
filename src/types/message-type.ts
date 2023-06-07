import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Conversation } from "src/schemas/conversation.schema";
import { ConversationType } from "./conversation.type";
import { UserType } from "./user.type";
import { User } from "src/schemas/user.schema";

@ObjectType()
export class MessageType {
  @Field({nullable: true})
  _id: string;

  @Field({nullable: true})
  content: string;

  @Field(type => ConversationType!, {nullable: true})
  conversation: ConversationType;

  @Field(type => UserType!, {nullable: true})
  sender: UserType;
}