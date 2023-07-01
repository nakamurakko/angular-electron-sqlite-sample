import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '../../src/@types/entities/interfaces/i-user';

/**
 * ユーザー Entity クラス。
 */
@Entity()
export class User implements IUser {

  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public firstName?: string;

  @Column()
  public lastName?: string;

}
