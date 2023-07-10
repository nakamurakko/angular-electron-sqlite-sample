import { finalize } from 'rxjs';
import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DialogResult } from 'src/app/data-types/dialog-result';
import { DbApiService } from 'src/app/services/db-api.service';
import { ProgressService } from 'src/app/services/progress.service';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * ユーザー詳細ダイアログコンポーネント。
 */
@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent implements OnInit {

  /** ユーザー ID。 */
  private userId: string = '';

  /** ユーザー情報。 */
  public user: IUser = {};

  /**
   * コンストラクター。
   *
   * @param dbApiService DB サービス。
   * @param progressService プログレスサービス。
   * @param dialogRef ダイアログリファレンス。
   * @param data ダイアログに受け渡すデータ。
   */
  public constructor(
    private dbApiService: DbApiService,
    private progressService: ProgressService,
    public dialogRef: MatDialogRef<UserDetailDialogComponent, DialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailDialogData
  ) {
    this.userId = data.userId;
  }

  public ngOnInit(): void {
    this.progressService.showProgress();
    this.dbApiService.getUser(this.userId)
      .pipe(
        finalize(() => this.progressService.hideProgress())
      )
      .subscribe(value => {
        this.user = value;
      });
  }

  /**
   * OK ボタンクリック処理。
   */
  public onOk(): void {
    this.dialogRef.close(DialogResult.OK);
  }

}

/**
 * UserDetailDialogComponent.data 用インターフェイス。
 */
export interface UserDetailDialogData {
  userId: string;
}
