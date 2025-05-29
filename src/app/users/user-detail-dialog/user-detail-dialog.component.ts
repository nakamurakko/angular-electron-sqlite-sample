import { finalize } from 'rxjs';
import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DialogResult } from 'src/app/data-types/dialog-result';
import { DbApiService } from 'src/app/services/db-api.service';
import { ProgressService } from 'src/app/services/progress.service';

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/**
 * ユーザー詳細ダイアログコンポーネント。
 */
@Component({
  selector: 'app-user-detail-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.css'
})
export class UserDetailDialogComponent implements OnInit {

  /** ユーザー ID。 */
  private userId: string = '';

  /** ユーザー情報。 */
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
    public dialogRef: MatDialogRef<UserDetailDialogComponent, DialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailDialogData,
    private dbApiService: DbApiService,
    private progressService: ProgressService
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
