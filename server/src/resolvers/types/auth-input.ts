import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
