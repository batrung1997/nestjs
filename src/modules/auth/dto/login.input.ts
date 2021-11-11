import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  //   @IsNotEmpty()
  @Field({ nullable: false })
  phone: string;

  //   @IsNotEmpty()
  @Field({ nullable: false })
  password: string;
}
