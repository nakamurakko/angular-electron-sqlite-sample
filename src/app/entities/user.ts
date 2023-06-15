import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * ユーザーエンティティクラス。
 */
@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  public id: string = '';

  @Column()
  public firstName: string = '';

  @Column()
  public lastName: string = '';

}
