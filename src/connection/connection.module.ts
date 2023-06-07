import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionSchema } from 'src/schemas/connection.schema';
import { Conversation, ConversationSchema } from 'src/schemas/conversation.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Connection.name, schema: ConnectionSchema},
      {name: Conversation.name, schema: ConversationSchema},
      {name: User.name, schema: UserSchema},
    ])
  ],
  providers: [ConnectionResolver, ConnectionService]
})
export class ConnectionModule {}
