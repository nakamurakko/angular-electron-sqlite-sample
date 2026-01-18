import { finalize } from 'rxjs';

import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { IUser } from '../../../@types/entities/interfaces/i-user';
import { DialogResult } from '../../data-types/dialog-result';
import { DbApiService } from '../../services/db-api.service';
import { ProgressService } from '../../services/progress.service';

/**
 * ユーザー編集ダイアログコンポーネント。
 */
@Component({
  selector: 'app-user-edit-dialog',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css',
})
export class UserEditDialogComponent implements OnInit {

  private dbApiService = inject(DbApiService);
  private progressService = inject(ProgressService);
  public dialogRef = inject(MatDialogRef<UserEditDialogComponent, DialogResult>);
  public data = inject<UserEditDialogData>(MAT_DIALOG_DATA);

  /** 編集ユーザー情報。 */
  public user = model<IUser>({});

  public ngOnInit(): void {
    if (!this.data.user?.id) {
      return;
    }

    this.progressService.showProgress();
    this.dbApiService.getUser(this.data.user.id!)
      .pipe(
        finalize(() => this.progressService.hideProgress())
      )
      .subscribe(value => {
        this.user.set(value);
      });
  }

  /**
   * 保存処理。
   */
  public onSave(): void {
    this.progressService.showProgress();
    this.dbApiService.addUser(this.user())
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
