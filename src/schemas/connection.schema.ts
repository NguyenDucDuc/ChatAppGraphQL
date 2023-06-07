import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Conversation } from './conversation.schema';

export type ConnectionDocument = HydratedDocument<Connection>;

@Schema()
export class Connection {
  @Prop()
  socketId: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', default: null})
  conversation: Conversation;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);