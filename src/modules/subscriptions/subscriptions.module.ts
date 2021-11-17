import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { PubsubService } from '../pubsub/pubsub.service';

@Module({
  providers: [SubscriptionsResolver, SubscriptionsService, PubsubService],
  imports: [],
})
export class SubscriptionsModule {}
