import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}
  async getAll(page: number, limit: number){
    if(!page) page = 1
    if(!limit) limit = 20
    try {
      const listUser = await this.userModel.find({}).skip((page-1)*limit).limit(limit)
      return listUser
    } catch (error) {
      console.log(error)
    }
  }
  async create(user: CreateUserDTO){
    try {
      const hashed = await bcrypt.hash(user.password, 10)
      const newUser = await this.userModel.create({
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        password: hashed,
        avatar: user.avatar
      })
      return newUser
    } catch (error) {
      console.log(error)
    }
  }
  async login({username, password}: LoginUserDTO){
    try {
      
    } catch (error) {
      console.log(error)
    }
  }
}
