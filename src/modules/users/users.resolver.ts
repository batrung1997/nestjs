import { Resolver, Query } from '@nestjs/graphql';
import { User } from './model/user.model';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  me() {
    return '';
  }
}
