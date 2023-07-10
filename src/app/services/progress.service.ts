import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

/**
 * プログレス表示用サービス。
 */
@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private _isShowProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isShowProgress(): boolean {
    return this._isShowProgress.getValue();
  }

  public constructor() { }

  /**
   * プログレスを表示状態にする。
   *
   * @returns プログレス表示状態。
   */
  public showProgress(): void {
    this._isShowProgress.next(true);
  }

  /**
   * プログレスを非表示状態にする。
   *
   * @returns プログレス表示状態。
   */
  public hideProgress(): void {
    this._isShowProgress.next(false);
  }

}
