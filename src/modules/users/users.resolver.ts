import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/auth-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminRolesGuard } from '../auth/roles.guard';
import { AccessTokenJwtData } from '../auth/types/jwt';
import { CreateUserInput } from './dto/create.user.input';
import { GetUsersInput } from './dto/get.users.input';
import { PaginatedUser, User } from './model/user.model';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  me(@CurrentUser() req: AccessTokenJwtData) {
    return this.userService.me(req.uid);
  }

  @Query(() => PaginatedUser)
  getUsers(@Args('input') input: GetUsersInput) {
    return this.userService.getUsers(input);
  }

  @UseGuards(AdminRolesGuard)
  @Mutation(() => User)
  createUser(
    @CurrentUser() req: AccessTokenJwtData,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.createUser(createUserInput);
  }
}
