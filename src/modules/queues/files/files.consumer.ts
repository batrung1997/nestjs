import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueNames } from '../type';

@Processor(QueueNames.QUEUE_UPLOAD)
export class FileConsumer {
  @OnQueueActive()
  // onActive(job: Job) {
  //   console.log(
  //     `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
  //   );
  // }
  @Process()
  async transcode(job: Job<unknown>) {
    console.log('job', job.data);
    // let progress = 0;
    // let i: any;
    // for (i = 0; i < 100; i++) {
    //   console.log(job.data);
    //   // await doSomething(job.data);
    //   progress += 10;
    //   await job.progress(progress);
    // }
    return {};
  }
}
