import { Field, InputType } from 'type-graphql'
import { User } from '../User'

@InputType()
export class NewUserInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  username: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}

@InputType()
export class LoginUserInput implements Partial<User> {
  @Field()
  usernameOrEmail: string

  @Field()
  password: string
}
