import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { ConfigurationService } from 'src/config/configuration.service';
import { User, UserDocument } from '../users/model/user.model';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schema/refresh.token.schema';
import { AccessTokenJwtData } from './types/jwt';
const ms = require('ms');

@Injectable()
export class AuthService {
  private refreshTokenTTL: number;
  private accessTokenTTL: number;
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly configrationService: ConfigurationService,
  ) {}

  async validateUser(phone: string, pass: string) {
    const user = await this.userModel.findOne({ phone }).lean().exec();
    const isMatch = await bcrypt.compare(pass, user?.password || '');

    if (!user && !isMatch) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...result } = user;
    return user;
  }

  async makeAccessToken(user: User) {
    const tokenData: AccessTokenJwtData = {
      tokenId: '',
      uid: user._id,
      role: user.role,
      username: user.username,
      phone: user.phone,
    };
    const token = this.jwtService.sign(tokenData);
    return token;
  }

  async createRefreshToken(
    userId: string,
    ipAddress?: string,
    clientId?: string,
  ) {
    const newRefreshToken = await this.refreshTokenModel.create({
      userId,
      ipAddress,
      clientId,
      expiresAt: moment().utc().toDate(),
    });

    return newRefreshToken;
  }

  async login(phone: string, password: string) {
    const user = await this.validateUser(phone, password);
    const accessToken = await this.makeAccessToken(user);
    const refreshToken = await this.createRefreshToken(user._id, '', '');
    return {
      expiresAt:
        moment().utc().valueOf() +
        ms(this.configrationService.get().auth.jwt.expires_in),
      payload: user,
      refreshToken: refreshToken._id.toString(),
      refreshTokenExpiresAt: moment().millisecond(),
      role: user.role,
      token: accessToken,
    };
  }
}
