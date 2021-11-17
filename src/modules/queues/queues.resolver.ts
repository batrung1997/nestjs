import { Resolver } from '@nestjs/graphql';
import { QueuesService } from './queues.service';

@Resolver('Queue')
export class QueuesResolver {
  constructor(private readonly queuesService: QueuesService) {}
}
