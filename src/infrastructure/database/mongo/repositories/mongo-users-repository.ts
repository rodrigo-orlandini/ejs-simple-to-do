import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from 'src/domain/entities/user';
import { UsersRepository } from 'src/domain/repositories/users-repository';

import { MongoService } from '../mongo.service';
import { USER_MODEL_NAME, USER_MODEL_SCHEMA } from '../schemas/user-schema';

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  private userModel: Model<any>;

  constructor(mongo: MongoService) {
    this.userModel = mongo.model(USER_MODEL_NAME, USER_MODEL_SCHEMA);
  }

  public async create(user: User): Promise<User> {
    await this.userModel.create({
      _id: user.id,
      username: user.username,
      password: user.password,
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    console.log(user);
    if (!user) {
      return null;
    }

    return user;
  }
}
