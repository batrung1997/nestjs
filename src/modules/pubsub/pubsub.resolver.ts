import { Resolver } from '@nestjs/graphql';
import { PubsubService } from './pubsub.service';

@Resolver()
export class PubsubResolver {
  constructor(private readonly pubsubService: PubsubService) {}
}
