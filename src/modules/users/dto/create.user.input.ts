import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ROLES } from '../types/user';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({
    message: 'Phone is not empty',
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

  @IsNotEmpty({
    message: 'Phone is not empty',
  })
  @MinLength(6, {
    message: 'Password at least 6 characters',
  })
  @Field({ nullable: false })
  password: string;
}
