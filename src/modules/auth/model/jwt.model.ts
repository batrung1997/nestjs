import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/model/user.model';
import { ROLES } from 'src/modules/users/types/user';

@ObjectType()
export class Jwt {
  @Field(() => ROLES)
  role: ROLES;

  @Field({ nullable: false })
  token: string;

  @Field({ nullable: false })
  refreshToken: string;

  @Field(() => Int)
  expiresAt: number;

  @Field(() => Int, {})
  refreshTokenExpiresAt: number;

  @Field(() => User, {})
  payload: User;
}
