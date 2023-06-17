// https://www.electronjs.org/ja/docs/latest/tutorial/context-isolation

import { IUser } from 'src/@types/entities/interfaces/i-user';

declare global {
  interface Window {
    DbApi: DbApi,
    GreetingApi: GreetingApi
  }
}

/**
 * DbApi 用インターフェイス。
 */
export interface DbApi {
  /**
   * ユーザー一覧を取得する。
   *
   * @returns ユーザー一覧。
   */
  getUsers(): Promise<Array<IUser>>;
}

/**
 * GreetingApi 用インターフェイス。
 */
export interface GreetingApi {
  /**
   * 挨拶を返す。
   *
   * @param whoIs 挨拶する相手
   * @returns 挨拶。
   */
  greeting(whoIs: string): Promise<string>;
}
