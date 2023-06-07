import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionSchema } from 'src/schemas/connection.schema';
import { JwtModule } from '@nestjs/jwt';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';
import { Conversation, ConversationSchema } from 'src/schemas/conversation.schema';
import { ConversationModule } from 'src/conversation/conversation.module';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    ConnectionModule,
    MessageModule,
    ConversationModule,
    UserModule,
    MongooseModule.forFeature([
      {name: Connection.name, schema: ConnectionSchema},
      {name: Message.name, schema: MessageSchema},
      {name: Conversation.name, schema: ConversationSchema},
      {name: User.name, schema: UserSchema},
    ]),
    JwtModule
  ],
  providers: [GatewayGateway, GatewayService, ConnectionService, MessageService]
})
export class GatewayModule {}
