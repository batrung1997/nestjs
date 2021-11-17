import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

@Injectable()
export class PubsubService {
  get pubsub() {
    return pubsub;
  }
}
