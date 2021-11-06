import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/model/user.model';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schema/refresh.token.schema';
import { AccessTokenJwtData } from './types/jwt';

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
  ) {}

  async validateUser(phone: string, pass: string) {
    const user = await this.userModel
      .findOne({ phone, password: pass })
      .lean()
      .exec();
    if (!user) {
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
      expiresAt: moment().add(this.refreshTokenTTL, 's').toDate(),
    });
    return newRefreshToken;
  }

  async login(phone: string, password: string) {
    const user = await this.validateUser(phone, password);
    const accessToken = await this.makeAccessToken(user);
    const refreshToken = await this.createRefreshToken(user._id, '', '');
    return {
      expiresAt: moment().unix(),
      payload: user,
      refreshToken: refreshToken._id.toString(),
      refreshTokenExpiresAt: moment().unix(),
      role: user.role,
      token: accessToken,
    };
  }
}
