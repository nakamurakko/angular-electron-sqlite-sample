import { defer, Observable } from 'rxjs';
import { IUser } from 'src/entities/interfaces/i-user';

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
   * ユーザー一覧を取得する。
   *
   * @returns ユーザー一覧。
   */
  public getUsers(): Observable<Array<IUser>> {
    return defer(() => window.DbApi.getUsers());
  }

}
