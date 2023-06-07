import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Conversation } from './conversation.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  fullName: string;

  @Prop()
  age: number;

  @Prop({default: null})
  avatar: string;

  @Prop()
  password: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'}], default: []})
  conversations: Conversation[];
}

export const UserSchema = SchemaFactory.createForClass(User);