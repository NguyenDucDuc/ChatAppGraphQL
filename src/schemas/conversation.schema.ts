import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Message } from './message.schema';
import { User } from './user.schema';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema()
export class Conversation {


  @Prop({default: ''})
  name: string;

  @Prop({default: null})
  avatar: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  members: User[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]})
  messages: Message[]

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null})
  lastMessage: Message

}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);