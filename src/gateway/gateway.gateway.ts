import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { Socket, Server } from 'socket.io';
import { ConnectionService } from 'src/connection/connection.service';
import { Req, UseGuards } from '@nestjs/common';
import { VerifyToken } from 'src/auth/guards/verify-token.guard';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDTO } from 'src/message/dto/create-message.dto';

@WebSocketGateway()
export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  constructor(
    private readonly gatewayService: GatewayService,
    private connectionService: ConnectionService,
    private messageService: MessageService,
    private jwtService: JwtService
  ) { }
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    await this.connectionService.deleteConnection(socket.id)
  }
  async handleConnection(@ConnectedSocket() socket: Socket) {
    const payload = this.jwtService.decode(socket.handshake.headers.authorization.split(' ')[1])
    await this.connectionService.createConnection(socket.id, payload.sub)
    socket.data.userId = payload.sub
    console.log(`${socket.id} connected`)
  }
  afterInit(server: any) {
    global._server = this.server;
  }
  @SubscribeMessage('join-conversation')
  async handleJoinConversation(@MessageBody() body: JoinConversation, @ConnectedSocket() socket: Socket){
    await this.connectionService.joinConversation(body.conversationId,socket.id)
    //join
    socket.join(body.conversationId)
    socket.data.conversationId = body.conversationId
    this.server.to(socket.id).emit("listen-join-conversation", "success")
  }

  @SubscribeMessage('message-text')
  async handleMessageText(@MessageBody() body: IMessageText, @ConnectedSocket() socket: Socket) {
    // get room Id
    const newMessage = await this.messageService.createMessage({content: body.content, conversationId: socket.data.conversationId}, socket.data.userId)
    this.server.to(socket.data.conversationId).emit('listen-message-text', newMessage)
    // emit message to user out room
    await this.gatewayService.handleMessageOutRoom(socket.data.conversationId, socket.data.userId, newMessage)
  }
}
