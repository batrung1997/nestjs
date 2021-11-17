import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionsService {
  //   constructor(private pubsubService: PubsubService) {}

  async userCreated() {
    return true;
  }
}
