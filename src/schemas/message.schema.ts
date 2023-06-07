import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Conversation } from './conversation.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {

  @Prop()
  content: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'})
  conversation: Conversation;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  sender: User;
  private _id: mongoose.Types.ObjectId;

}

export const MessageSchema = SchemaFactory.createForClass(Message);