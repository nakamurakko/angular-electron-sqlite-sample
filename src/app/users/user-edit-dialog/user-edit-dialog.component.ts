import { finalize } from 'rxjs';
import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DialogResult } from 'src/app/data-types/dialog-result';
import { DbApiService } from 'src/app/services/db-api.service';
import { ProgressService } from 'src/app/services/progress.service';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * ユーザー編集ダイアログコンポーネント。
 */
@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {

  /** ユーザー ID。新規の場合は空。 */
  public userId: string = '';

  /** 編集ユーザー情報。 */
  public user: IUser = {};

  /**
   * コンストラクター。
   * 
   * @param dialogRef ダイアログリファレンス。
   * @param data ダイアログに受け渡すデータ。
   * @param dbApiService DB サービス。
   * @param progressService プログレスサービス。
   */
  public constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent, DialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: UserEditDialogData,
    private dbApiService: DbApiService,
    private progressService: ProgressService
  ) {
    if (data) {
      this.userId = data.userId;
    }
  }

  public ngOnInit(): void {
    if (!this.userId) {
      return;
    }

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
   * 保存処理。
   */
  public onSave(): void {
    this.progressService.showProgress();
    this.dbApiService.addUser(this.user)
      .pipe(
        finalize(() => this.progressService.hideProgress())
      )
      .subscribe(() => {
        this.dialogRef.close(DialogResult.OK);
      });
  }

  /**
   * キャンセル処理。
   */
  public onCancel(): void {
    this.dialogRef.close(DialogResult.Cancel);
  }

}

/**
 * UserEditDialogComponent.data 用インターフェイス。
 */
export interface UserEditDialogData {
  userId: string;
}
