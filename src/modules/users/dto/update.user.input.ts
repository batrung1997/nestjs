import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ROLES } from '../types/user';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  _id: string;

  @IsNotEmpty({
    message: 'Username is not empty',
  })
  @Field({ nullable: false })
  username: string;

  @IsNotEmpty({
    message: 'Phone is not empty',
  })
  @Field({ nullable: false })
  phone: string;

  @Field({ nullable: true })
  address: string;

  @Field(() => ROLES, { nullable: true })
  role: ROLES;
}
