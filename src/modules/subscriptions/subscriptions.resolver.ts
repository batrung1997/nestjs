import { Resolver, Subscription } from '@nestjs/graphql';
import { PubsubService } from '../pubsub/pubsub.service';
import { User } from '../users/model/user.model';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionName } from './type';

@Resolver()
export class SubscriptionsResolver {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private pubsubService: PubsubService,
  ) {}

  @Subscription(() => User)
  userCreated() {
    return this.pubsubService.pubsub.asyncIterator(
      SubscriptionName.userCreated,
    );
  }
}
