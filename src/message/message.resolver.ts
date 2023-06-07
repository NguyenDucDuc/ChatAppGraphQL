import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { CreateMessageDTO } from './dto/create-message.dto';
import {UseGuards } from '@nestjs/common';
import { VerifyToken } from 'src/auth/guards/verify-token.guard';
import { MessageType } from 'src/types/message-type';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}
  @Mutation(returns => MessageType)
  @UseGuards(VerifyToken)
  async createMessage(@Args('message') message: CreateMessageDTO, @Context() ctx: any){
    return await this.messageService.createMessage(message, ctx.req.user.sub)
  }
  @Query(returns => [MessageType])
  async getAllMessage(@Args('conversationId') conversationId: string){
    return await this.messageService.getAllMessage(conversationId)
  }

  @Mutation(returns => MessageType)
  async deleteMessage(@Args('messageId') messageId: string){
    return await this.messageService.deleteMessage(messageId)
  }
}
