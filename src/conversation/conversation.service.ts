import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from 'src/schemas/conversation.schema';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { User } from 'src/schemas/user.schema';
import { CreateConversationGroupDTO } from './dto/create-conversation-group.dto';
import { promises } from 'dns';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }
  async create(conversation: CreateConversationDTO) {
    const session = await this.conversationModel.startSession()
    try {
      session.startTransaction()
      const [newConversation] = await this.conversationModel.create({
        members: conversation.members
      }, { session })
      // update conversation for user schema
      await Promise.all(conversation.members.map(async (userId) => {
        await this.userModel.updateOne({ _id: userId }, { $push: { conversations: newConversation._id } })
      }))
      return newConversation.populate('members')
    } catch (error) {
      await session.abortTransaction()
      console.log(error)
    }
  }
  async getMyConversation(userId: string) {
    try {
      const listConversation = await this.conversationModel.find({
        members: { $in: [userId] }
      }).populate('members').populate('lastMessage')
      return listConversation
    } catch (error) {
      console.log(error)
    }
  }
  async createConversationGroup(conversation: CreateConversationGroupDTO) {
    try {
      const newConversation = await this.conversationModel.create({
        name: conversation.name,
        members: conversation.members
      })
      // update in user schema
      await Promise.all(newConversation.members.map(async (userId) => {
        await this.userModel.updateOne({_id: userId}, {$push: {conversations: newConversation._id}})
      }))
      return newConversation.populate([{path: 'members'}, {path: 'lastMessage'}])
    } catch (error) {
      console.log(error)
    }
  }
  async getMemberByConversationId(conversationId: string){
    try {
      const listMembers = await this.conversationModel.findById(conversationId).populate('members')
      return listMembers
    } catch (error) {
      console.log(error)
    }
  }
}
