import { Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class SupperAdminGuard extends JwtAuthGuard {
  constructor() {
    super();
  }

  async canActivate() {
    // const isAuth = await super.canActivate(context);
    // if (!isAuth) {
    //   const message = '';
    //   throw new BadRequestException(message);
    // }
    // const ctx = await super.getRequest(context);
    // if (!ctx || !ctx.user || ![ROLES.SUPER_ADMIN].includes(ctx.user.role)) {
    //   const message = '';
    //   throw new BadRequestException(message);
    // }
    return true;
  }
}
