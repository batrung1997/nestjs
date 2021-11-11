import { Type } from '@nestjs/common';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@InputType()
export class Pagination {
  @Field()
  page: number;

  @Field()
  limit: number;

  @Field({ nullable: true })
  offset: number;
}

export interface IPaginatedType<T> {
  items: T[];
  currentPage: number;
  total: number;
  totalPage: number;
}

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: false })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int, { nullable: true })
    totalPage: number;
  }
  return PaginatedType;
}

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}

registerEnumType(Sort, {
  name: 'Sort',
});
