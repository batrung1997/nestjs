import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailConsumer } from './email/email.consumer';
import { FileConsumer } from './files/files.consumer';
import { QueuesResolver } from './queues.resolver';
import { QueuesService } from './queues.service';
import { QueueNames } from './type';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueNames.QUEUE_UPLOAD,
    }),
    BullModule.registerQueue({
      name: QueueNames.QUEUE_EMAIL,
    }),
  ],
  providers: [QueuesResolver, QueuesService, EmailConsumer, FileConsumer],
  exports: [QueuesService],
})
export class QueuesModule {}
