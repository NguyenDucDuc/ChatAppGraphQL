import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WebSocketServer } from '@nestjs/websockets';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Server } from 'socket.io'
import { Connection } from 'src/schemas/connection.schema';
import { Message, MessageDocument } from 'src/schemas/message.schema';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Connection.name) private connectionModel: Model<Connection>
  ) { }
  async handleMessageOutRoom(conversationId: string, userId: string, message: any) {
    try {
      const listConnection = await this.connectionModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userConnection'
          }
        },
        {
          $unwind: "$userConnection"
        },
        {
          $match: {
            "userConnection.conversations": {$in: [new mongoose.Types.ObjectId("64801c7ce76081a3a593aa33")]},
            "conversation": {$eq: null}
          }
        }
      ])
      await Promise.all(listConnection.map(async (connectionItem) => {
        global._server.to(connectionItem.socketId).emit('listen-last-message', message)
      }))
    } catch (error) {
      console.log(error)
    }
  }
}
