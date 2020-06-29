import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  getRepository,
} from 'typeorm';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('int', { default: 0 })
  count: number;
}

export const findUser = (id: string) => getRepository(User).findOne(id);

export default User;
