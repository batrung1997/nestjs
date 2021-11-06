import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from 'src/config/configuration.module';
import { ConfigurationService } from 'src/config/configuration.service';
import { User, UserSchema } from '../users/model/user.model';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schema/refresh.token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),

    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule], // Missing this
      useFactory: async (configService: ConfigurationService) => ({
        signOptions: {
          expiresIn: configService.get().auth.jwt.expires_in,
        },
        secret: configService.get().auth.jwt.secret,
      }),
      inject: [ConfigurationService],
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
