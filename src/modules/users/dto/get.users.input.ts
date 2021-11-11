import { Field, InputType } from '@nestjs/graphql';
import { Pagination } from 'src/types/query';

@InputType()
export class GetUsersInput extends Pagination {
  @Field({ nullable: true })
  username: string;
}
