import { defer, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreetingApiService {

  public constructor() { }

  /**
   * 挨拶を返す。
   *
   * @param whoIs 挨拶する相手
   * @returns 挨拶。
   */
  public greeting(whoIs: string): Observable<string> {
    return defer(() => window.GreetingApi.greeting(whoIs));
  }

}
