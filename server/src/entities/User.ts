import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity, Column,
  CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
