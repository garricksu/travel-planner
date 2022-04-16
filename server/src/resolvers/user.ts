import * as argon2 from 'argon2'
import { dataSource } from '../dataSource'
import { LoginUserInput, NewUserInput } from '../entities/types/userTypes'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
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
  @Mutation(() => User)
  async register(@Arg('input') newUserData: NewUserInput): Promise<User> {
    const { firstName, lastName, email, username, password } = newUserData
    const hashedPassword = await argon2.hash(password)

    const result = await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName, lastName, email, username, password: hashedPassword },
      ])
      .returning('id, "firstName", "lastName", email, username')
      .execute()

    const user = result.raw[0]
    return user
  }

  // login user
  @Mutation(() => User, { nullable: true })
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
