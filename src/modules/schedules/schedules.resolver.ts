import { Resolver } from '@nestjs/graphql';
import { Schedule } from './entities/schedule.entity';
import { SchedulesService } from './schedules.service';

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}
}
