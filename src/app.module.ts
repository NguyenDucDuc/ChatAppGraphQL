import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { ConnectionModule } from './connection/connection.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MessageModule } from './message/message.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/graphql_chat'),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: '1d'}
    }),
    UserModule, 
    ConversationModule, 
    ConnectionModule, AuthModule, MessageModule, GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
