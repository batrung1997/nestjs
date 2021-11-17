import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class File {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => String)
  @Prop(String)
  url: string;

  @Field(() => String, { nullable: true })
  @Prop(String)
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop(String)
  mimetype?: string;

  @Field(() => String, { nullable: true })
  @Prop(String)
  thumbnail?: string;

  @Field(() => Float)
  @Prop(Float)
  createdAt: number;
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);
