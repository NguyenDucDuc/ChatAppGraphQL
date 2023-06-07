import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Conversation, ConversationSchema } from 'src/schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Conversation.name, schema: ConversationSchema}
    ])
  ],
  providers: [ConversationResolver, ConversationService]
})
export class ConversationModule {}
