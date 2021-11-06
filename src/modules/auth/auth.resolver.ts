import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { Jwt } from './model/jwt.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Jwt)
  async login(@Args('input') loginInput: LoginInput) {
    return this.authService.login(loginInput.username, loginInput.password);
  }
}
