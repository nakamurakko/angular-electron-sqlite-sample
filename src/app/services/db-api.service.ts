import { defer, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { IUser } from '../../@types/entities/interfaces/i-user';

/**
 * DbApi 用サービス。
 */
@Injectable({
  providedIn: 'root',
})
export class DbApiService {

  /**
   * ユーザーを追加する。
   *
   * @param user ユーザー ID。
   * @returns ユーザー。
   */
  public addUser(user: IUser): Observable<IUser> {
    return defer(() => window.dbApi.addUser(user));
  }

  /**
   * ユーザーを取得する。
   *
   * @param userId ユーザー ID。
   * @returns ユーザー。
   */
  public getUser(userId: string): Observable<IUser> {
    return defer(() => window.dbApi.getUser(userId));
  }

  /**
   * ユーザー一覧を取得する。
   *
   * @returns ユーザー一覧。
   */
  public getUsers(): Observable<IUser[]> {
    return defer(() => window.dbApi.getUsers());
  }

}
