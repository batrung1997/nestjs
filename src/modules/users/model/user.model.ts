import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Paginated } from 'src/types/query';
import { ROLES } from '../types/user';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop(String)
  username: string;

  @Field()
  @Prop(String)
  phone: string;

  @Field({ nullable: true })
  @Prop(String)
  address: string;

  @Field()
  @Prop(String)
  password: string;

  @Field(() => ROLES, { defaultValue: ROLES.ADMIN })
  @Prop(() => ROLES)
  role: ROLES;

  @Prop({ type: MongoSchema.Types.Number })
  @Field(() => Float, { nullable: true })
  createdAt: number;

  @Prop({ type: MongoSchema.Types.Number })
  @Field(() => Float, { nullable: true })
  updatedAt: number;

  @Prop({ type: MongoSchema.Types.Number })
  @Field(() => Float, { nullable: true })
  deletedAt: number;

  @Prop({ type: MongoSchema.Types.ObjectId, index: true })
  @Field(() => ID, { nullable: true })
  deletedBy: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
