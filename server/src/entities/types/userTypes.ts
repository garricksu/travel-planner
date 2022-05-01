import { Field, InputType, ObjectType } from 'type-graphql'
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

@ObjectType()
export class UserProfile implements Partial<User> {
  @Field()
  id: number

  @Field()
  email: string

  @Field()
  username: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}

@ObjectType()
export class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}



@ObjectType()
export class UserResponse {
  @Field(() => UserProfile, {nullable: true}) 
  user?: UserProfile

  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]
}
