import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { ConfigurationService } from 'src/config/configuration.service';
import { responseData } from 'src/helpers/data';
import { COMMON_ERRORS } from 'src/types/message';
import { PaginatedUser, User, UserDocument } from '../users/model/user.model';
import { CreateUserInput } from './dto/create.user.input';
import { GetUsersInput } from './dto/get.users.input';
import { ROLES } from './types/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly configrationService: ConfigurationService,
  ) {}

  async checkPhone(phone: string) {
    const isPhone = await this.userModel
      .findOne({
        phone: phone,
      })
      .exec();
    if (isPhone) {
      return true;
    }
    return false;
  }

  async createUser(input: CreateUserInput) {
    const isPhone = await this.checkPhone(input.phone);
    if (isPhone) {
      return new BadRequestException(COMMON_ERRORS.PHONE_EXITS);
    }
    const passwordHash = await bcrypt.hash(
      input.password,
      this.configrationService.get().password.saltOrRounds,
    );
    const data = {
      ...input,
      password: passwordHash,
      role: input.role ? input.role : ROLES.CTV,
    };
    const req = await this.userModel.create(data);
    return req;
  }

  async getUsers(input: GetUsersInput): Promise<PaginatedUser> {
    const total = await this.userModel
      .find(input.username ? { username: input.username } : {})
      .countDocuments();
    const items = await this.userModel
      .find()
      .skip((input.page - 1) * input.limit)
      .limit(input.limit)
      .lean()
      .exec();

    return responseData(
      items,
      total,
      input.page,
      Math.ceil(total / input.limit),
    );
  }

  async me(id: string): Promise<User> {
    const meInfo = await this.userModel.findOne({ _id: id }).lean().exec();
    return meInfo;
  }
}
