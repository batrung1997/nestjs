import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

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

  @IsNotEmpty({
    message: 'Phone is not empty',
  })
  @MinLength(6, {
    message: 'Password at least 6 characters',
  })
  @Field({ nullable: false })
  password: string;
}
