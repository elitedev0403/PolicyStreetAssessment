import { prop as Property, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType({ description: 'The Users Model' })
@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ type: () => String, required: true })
  public name: string;

  @Field()
  @Property({ type: () => String, required: true })
  public email: string;

  @Field()
  @Property({ type: () => String, required: true })
  public password: string;

  @Field()
  @Property({ required: true, default: Date.now })
  createdAt: Date;

  @Field()
  @Property({ required: true, default: Date.now })
  updatedAt: Date;
}

export const UsersModel = getModelForClass(User);
