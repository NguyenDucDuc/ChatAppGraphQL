import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection } from 'src/schemas/connection.schema';
import { Conversation } from 'src/schemas/conversation.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ConnectionService {
  private connectionLogger = new Logger('Connection')
  constructor(
    @InjectModel(Connection.name) private connectionModel: Model<Connection>,
    @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
  ){}
  async createConnection(socketId: string, userId: string){
    try {
      const newConnection = await this.connectionModel.create({
        user: userId,
        socketId,
        conversation: null
      })
    } catch (error) {
      console.log(error)
    }
  }
  async deleteConnection(socketId: string){
    try {
      await this.connectionModel.deleteOne({socketId})
    } catch (error) {
      console.log(error)
    }
  }

  async joinConversation(conversationId: string, socketId: string){
    try {
      await this.connectionModel.updateOne({socketId}, {$set: {conversation: conversationId}})
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async handleMessageOutRoom(conversationId: string){
    try {
      const listMember = await this.conversationModel.find({})
    } catch (error) {
      this.connectionLogger.log(error)
    }
  }
}
