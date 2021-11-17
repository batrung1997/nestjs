import { Module } from '@nestjs/common';
import { PubsubService } from './pubsub.service';
import { PubsubResolver } from './pubsub.resolver';

@Module({
  providers: [PubsubResolver, PubsubService],
  exports: [PubsubService],
})
export class PubsubModule {}
