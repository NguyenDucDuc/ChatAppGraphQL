import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }
  async login({ username, password }: LoginUserDTO) {
    try {
      const user = await this.userModel.findOne({
        username
      })
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
          const accessToken = await this.jwtService.signAsync({
            sub: user._id,
            username: user.username
          })
          user['accessToken'] = accessToken
          return user
        } else {
          throw new BadRequestException('Password is not valid!')
        }
      } else {
        throw new BadRequestException()
      }
    } catch (error) {
      console.log(error)
    }
  }
}
