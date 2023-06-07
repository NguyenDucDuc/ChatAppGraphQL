import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginType } from 'src/types/user-login.type';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(returns => LoginType)
  async login(@Args('username') username: string, @Args('password') password: string){
    return await this.authService.login({username, password})
  }

}
