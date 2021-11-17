import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QueueNames } from './type';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue(QueueNames.QUEUE_UPLOAD) private fileQueue: Queue,
    @InjectQueue(QueueNames.QUEUE_EMAIL) private mailQueue: Queue,
  ) {}

  async testQueueFile() {
    const res = await this.fileQueue.add({
      name: 'testqueueFile',
      file: 24,
    });
    return res;
  }

  async testQueueSendMail() {
    const res = await this.mailQueue.add({
      name: 'testqueue',
      age: 24,
    });
    return res;
  }
}
