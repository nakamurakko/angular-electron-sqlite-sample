import { finalize } from 'rxjs';
import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DialogResult } from 'src/app/data-types/dialog-result';
import { DbApiService } from 'src/app/services/db-api.service';
import { ProgressService } from 'src/app/services/progress.service';

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {

  /** 編集ユーザー情報。 */
  public user: IUser = {};

  /**
   * コンストラクター。
   *
   * @param dialogRef ダイアログリファレンス。
   */
  public constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent, DialogResult>,
    private dbApiService: DbApiService,
    private progressService: ProgressService
  ) {
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
