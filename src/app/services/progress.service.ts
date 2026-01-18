import { Injectable, signal } from '@angular/core';

/**
 * プログレス表示用サービス。
 */
@Injectable({
  providedIn: 'root',
})
export class ProgressService {

  public isShowProgress = signal<boolean>(false);

  /**
   * プログレスを表示状態にする。
   *
   * @returns プログレス表示状態。
   */
  public showProgress(): void {
    this.isShowProgress.set(true);
  }

  /**
   * プログレスを非表示状態にする。
   *
   * @returns プログレス表示状態。
   */
  public hideProgress(): void {
    this.isShowProgress.set(false);
  }

}
