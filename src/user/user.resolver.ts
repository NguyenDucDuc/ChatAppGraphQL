import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from 'src/types/user.type';
import { CreateUserDTO } from './dto/create-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(returns => [UserType])
  async getAllUser(@Args('page', {nullable: true}) page: number, @Args('limit', {nullable: true}) limit: number){
    return await this.userService.getAll(page, limit)
  }

  @Mutation(returns => UserType)
  async createUser(@Args('user') user: CreateUserDTO){
    return await this.userService.create(user)
  }
}
