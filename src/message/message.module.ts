import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/schemas/conversation.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Conversation.name, schema: ConversationSchema},
      {name: Message.name, schema: MessageSchema}
    ])
  ],
  providers: [MessageResolver, MessageService]
})
export class MessageModule {}
