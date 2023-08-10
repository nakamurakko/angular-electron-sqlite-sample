// https://www.electronjs.org/ja/docs/latest/tutorial/context-isolation

import { IUser } from 'src/@types/entities/interfaces/i-user';

declare global {
  interface Window {
    DbApi: DbApi
  }
}

/**
 * DbApi 用インターフェイス。
 */
export interface DbApi {

  /**
   * ユーザーを追加する。
   *
   * @param user ユーザー ID。
   * @returns ユーザー。
   */
  addUser(user: IUser): Promise<IUser>;

  /**
   * ユーザーを取得する。
   *
   * @param userId ユーザー ID。
   */
  getUser(userId: string): Promise<IUser>;

  /**
   * ユーザー一覧を取得する。
   *
   * @returns ユーザー一覧。
   */
  getUsers(): Promise<Array<IUser>>;

}
