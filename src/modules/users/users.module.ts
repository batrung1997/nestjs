import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubsubService } from '../pubsub/pubsub.service';
import { User, UserSchema } from './model/user.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersResolver, PubsubService],
  exports: [UsersService],
})
export class UsersModule {}
