import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';
import { CreateMessageDTO } from './dto/create-message.dto';
import { Conversation } from 'src/schemas/conversation.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Conversation.name) private conversationModel: Model<Conversation>
  ){}
  async createMessage(message: CreateMessageDTO, userId: string){
    try {
      const newMessage = await this.messageModel.create({
        content: message.content,
        conversation: message.conversationId,
        sender: userId
      })
      await this.conversationModel.updateOne({_id: message.conversationId}, {$push: {messages: newMessage._id}})
      // update last message
      await this.conversationModel.updateOne({_id: message.conversationId}, {$set: {lastMessage: newMessage._id}})
      return newMessage.populate([{path: 'sender'}, {path: 'conversation'}])
    } catch (error) {
      console.log(error)
    }
  }

  async getAllMessage(conversationId: string){
    try {
      const listMessage = await this.messageModel.find({
        conversation: conversationId
      }).populate('sender')
      return listMessage
    } catch (error) {
      console.log(error)
    }
  }

  async deleteMessage(messageId: string){
    try {
      const message = await this.messageModel.findOneAndDelete({_id: messageId})
      // remove in conversation
      const conversation = await this.conversationModel.findOneAndDelete({_id: message.conversation}, {$pull: {messages: message._id}})
      return message.populate('sender')
    } catch (error) {
      console.log(error)
    }
  }
}
