import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create.user.input';
import { GetUsersInput } from './dto/get.users.input';
import { PaginatedUser, User } from './model/user.model';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  me() {
    return '';
  }

  @Query(() => PaginatedUser)
  getUsers(@Args('input') input: GetUsersInput) {
    return this.userService.getUsers(input);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }
}
