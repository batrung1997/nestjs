import { CreateQueueInput } from './create-queue.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateQueueInput extends PartialType(CreateQueueInput) {
  id: number;
}
