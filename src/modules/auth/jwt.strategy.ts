import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationService } from 'src/config/configuration.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AccessTokenJwtData } from './types/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigurationService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get().auth.jwt.secret,
    });
  }

  async validate(payload: AccessTokenJwtData) {
    return payload;
  }
}
