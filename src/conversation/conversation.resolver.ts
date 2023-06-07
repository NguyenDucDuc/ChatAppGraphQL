import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { ConversationType } from 'src/types/conversation.type';
import { UseGuards } from '@nestjs/common';
import { VerifyToken } from 'src/auth/guards/verify-token.guard';
import { CreateConversationGroupDTO } from './dto/create-conversation-group.dto';

@Resolver()
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}
  @Mutation(returns => ConversationType)
  async createConversation(@Args('conversation') conversation: CreateConversationDTO){
    return await this.conversationService.create(conversation)
  }

  @Query(returns => [ConversationType])
  @UseGuards(VerifyToken)
  async getMyConversation(@Context() ctx: any){
    return await this.conversationService.getMyConversation(ctx.req.user.sub)
  }

  @Mutation(returns => ConversationType)
  async createConversationGroup(@Args('conversationGroup') conversationGroup: CreateConversationGroupDTO){
    return await this.conversationService.createConversationGroup(conversationGroup)
  }

  @Query(returns => ConversationType)
  async getMemberByConversationId(@Args('conversationId') conversationId: string){
    return await this.conversationService.getMemberByConversationId(conversationId)
  }
}
