import { UseMiddleware, Ctx, Field, Resolver, Mutation, Arg, Query, ID, ObjectType } from 'type-graphql';
import { NotesModel, Notes } from '../models/notes.model';
import { LoginInput, RegisterUserInput } from './types/auth-input';
import { UsersModel, User } from '../models/users.model';
import { MyContext, isAuth } from './context';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '../config';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver((_of) => Notes)
export class AuthResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async Me(@Ctx() { payload }: MyContext) {
    return `Your user id : ${payload!.id}`;
  }

  @Query(() => LoginResponse, { nullable: false, name: 'loginUser' })
  async loginUser(@Arg('loginInput') { email, password }: LoginInput) {
    const user = await UsersModel.findOne({ email });
    if (!user) {
      throw new Error("Could not found user");
    }

    const verify = compareSync(password, user.password);

    if (!verify) {
      throw new Error("Bad Password");
    }

    return {
      accessToken: sign({ ...user }, config.jwtSecret)
    }
    // return await NotesModel.findById({ _id: id });
  }

  @Query(() => User, { nullable: false, name: 'getUser' })
  @UseMiddleware(isAuth)
  async getUser(@Arg('id') id: string, @Ctx() { payload }: MyContext) {
    return await UsersModel.findById({ _id: id });
  }

  @Query(() => [User], { name: 'getAllUsers', description: 'Get List of Users' })
  async getAllUsers() {
    return await UsersModel.find();
  }

  @Mutation(() => User, { name: 'registerUser' })
  async registerUser(@Arg('registerUserInput') { name, email, password }: RegisterUserInput): Promise<User> {
    const hashedPassword = hashSync(password, 10);
    const user = (
      await UsersModel.create({
        name,
        email,
        password: hashedPassword,
        isArchived: false,
      })
    ).save();

    return user;
  }

}
