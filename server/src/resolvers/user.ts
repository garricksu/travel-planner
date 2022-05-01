import * as argon2 from 'argon2'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { dataSource } from '../dataSource'
import {
  LoginUserInput,
  NewUserInput,
  UserResponse,
} from '../entities/types/userTypes'
import { User } from '../entities/User'

@Resolver(User)
export class UserResolver {
  // return all users
  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    const users = await User.find()
    return users
  }

  // register user
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') newUserData: NewUserInput
  ): Promise<UserResponse> {
    const { firstName, lastName, email, username, password } = newUserData
    const hashedPassword = await argon2.hash(password)
    let user
    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          { firstName, lastName, email, username, password: hashedPassword },
        ])
        .returning('id, "firstName", "lastName", email, username')
        .execute()

      user = result.raw[0]
      console.log(result)
    } catch (err) {
      if (err.code === '23505' && err.detail.includes('(email)')) {
        return {
          errors: [
            {
              field: 'email',
              message: 'An account with this email already exists',
            },
          ],
        }
      }
      else if (err.code === '23505' && err.detail.includes('(username)')) {
        return {
          errors: [
            {
              field: 'username',
              message: 'An account with this username already exists',
            },
          ],
        }
      }
      else {
        return {
          errors: [
            {
              field: 'server',
              message: 'Internal server error. Please try again.'
            }
          ]
        }
      }
    }

    return { user }
  }

  // login user
  @Mutation(() => UserResponse, { nullable: true })
  async login(@Arg('input') loginUserdata: LoginUserInput) {
    const { usernameOrEmail, password } = loginUserdata

    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    )

    if (user && (await argon2.verify(user.password, password))) {
      return user
    }
    return null
  }
}
