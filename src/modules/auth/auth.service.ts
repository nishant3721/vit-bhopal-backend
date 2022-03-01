/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user';
import { AuthorizeDto } from './dto/authorize.dto';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}
  validateUser(token: string): User {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    return userInfo.data;
  }

  getToken(userInfo: User): string {
    const token = jwt.sign({ data: userInfo }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return token;
  }

  async signup(authDto: AuthorizeDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(authDto.password, salt);
    authDto.password = securePassword;
    const userInfo = await this.userModel.findOne({ email: authDto.email });
    if (userInfo) {
      throw new ConflictException(
        'Sorry, A user with this email already exists.',
      );
    }
    await new this.userModel(authDto).save();
    let user;
    user = await this.userModel
      .findOne({ email: authDto.email })
      .select({ password: 0 })
      .exec();
    user = new User(user);
    user.token = this.getToken(user);
    return user;
  }

  async login(authDto: AuthorizeDto): Promise<User> {
    const userInfo = await this.userModel.findOne({
      email: authDto.email,
    });
    if (!userInfo) {
      throw new UnauthorizedException(
        'Please try to login with correct credentials',
      );
    }
    // Verify the password is correct or not
    const passwordCompare = await bcrypt.compare(
      authDto.password,
      userInfo.password,
    );
    if (!passwordCompare) {
      throw new UnauthorizedException(
        'Please try to login with correct credentials',
      );
    }
    let user;
    user = await this.userModel
      .findOne({ email: authDto.email })
      .select({ password: 0 })
      .exec();
    user = new User(user);
    user.token = this.getToken(user);
    return user;
  }

  getUser(req: any): Promise<User> {
    const userId = req.user._id;
    return this.userModel
      .findOne({ _id: userId })
      .select({ password: 0 })
      .exec();
  }
}
