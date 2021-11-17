import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueuesModule } from '../queues/queues.module';
import { QueueNames } from '../queues/type';
import { File, FileSchema } from './entities/file.entity';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService, FilesResolver],
  imports: [
    QueuesModule,
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    BullModule.registerQueue({
      name: QueueNames.QUEUE_UPLOAD,
    }),
  ],
  exports: [FilesService],
})
export class FilesModule {}
