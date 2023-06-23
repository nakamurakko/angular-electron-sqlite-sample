import { defer, Observable } from 'rxjs';
import { IUser } from 'src/@types/entities/interfaces/i-user';

import { Injectable } from '@angular/core';

/**
 * DbApi 用サービス。
 */
@Injectable({
  providedIn: 'root'
})
export class DbApiService {

  public constructor() { }

  /**
   * ユーザーを取得する。
   *
   * @param userId ユーザー ID。
   * @returns ユーザー。
   */
  public getUser(userId: string): Observable<IUser> {
    return defer(() => window.DbApi.getUser(userId));
  }

  /**
   * ユーザー一覧を取得する。
   *
   * @returns ユーザー一覧。
   */
  public getUsers(): Observable<Array<IUser>> {
    return defer(() => window.DbApi.getUsers());
  }

}
