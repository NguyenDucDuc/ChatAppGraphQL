import { Field, ObjectType } from "@nestjs/graphql";
import { UserType } from "./user.type";
import { MessageType } from "./message-type";

@ObjectType()
export class ConversationType {
  @Field({nullable: true})
  _id: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  avatar: string;

  @Field(type => [UserType!], {nullable: true})
  members: UserType[];

  @Field(type => MessageType!, {nullable: true})
  lastMessage: MessageType[];
}