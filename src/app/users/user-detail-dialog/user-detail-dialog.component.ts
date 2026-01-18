import { finalize } from 'rxjs';

import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { IUser } from '../../../@types/entities/interfaces/i-user';
import { DialogResult } from '../../data-types/dialog-result';
import { DbApiService } from '../../services/db-api.service';
import { ProgressService } from '../../services/progress.service';

/**
 * ユーザー詳細ダイアログコンポーネント。
 */
@Component({
  selector: 'app-user-detail-dialog',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.css',
})
export class UserDetailDialogComponent implements OnInit {

  private dbApiService = inject(DbApiService);
  private progressService = inject(ProgressService);
  public dialogRef = inject(MatDialogRef<UserDetailDialogComponent, DialogResult>);
  public data = inject<UserDetailDialogData>(MAT_DIALOG_DATA);

  /** ユーザー情報。 */
  public user = signal<IUser>({});

  public ngOnInit(): void {
    this.progressService.showProgress();
    this.dbApiService.getUser(this.data.userId)
      .pipe(
        finalize(() => this.progressService.hideProgress())
      )
      .subscribe(value => {
        this.user.set(value);
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
