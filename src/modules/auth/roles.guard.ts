import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { COMMON_ERRORS } from 'src/types/message';
import { ROLES } from '../users/types/user';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class AdminRolesGuard extends JwtAuthGuard {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isAuth = await super.canActivate(context);
    if (!isAuth) {
      throw new BadRequestException(COMMON_ERRORS.TOKEN_EXPIRED);
    }
    const ctx = await super.getRequest(context);

    if (!ctx || !ctx.user || ctx.user.role !== ROLES.ADMIN) {
      throw new BadRequestException(COMMON_ERRORS.PERMISSION_DENIED);
    }

    return true;
  }
}
