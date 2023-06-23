import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DialogResult } from 'src/app/data-types/dialog-result';
import { DbApiService } from 'src/app/services/db-api.service';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent implements OnInit {

  private userId: string = '';

  public user: IUser = {};

  public constructor(
    private dbApiService: DbApiService,
    public dialogRef: MatDialogRef<UserDetailDialogComponent, DialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailDialogData
  ) {
    this.userId = data.userId;
  }

  public ngOnInit(): void {
    this.dbApiService.getUser(this.userId)
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
