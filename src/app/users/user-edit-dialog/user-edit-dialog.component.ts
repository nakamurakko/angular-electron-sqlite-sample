import { finalize } from 'rxjs';
import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DialogResult } from 'src/app/data-types/dialog-result';
import { DbApiService } from 'src/app/services/db-api.service';
import { ProgressService } from 'src/app/services/progress.service';

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * ユーザー編集ダイアログコンポーネント。
 */
@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css'
})
export class UserEditDialogComponent implements OnInit {

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
    if (data?.user) {
      this.user = data.user;
    }
  }

  public ngOnInit(): void {
    if (!this.user?.id) {
      return;
    }

    this.progressService.showProgress();
    this.dbApiService.getUser(this.user.id)
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

  user: IUser;

}
