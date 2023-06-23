import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DbApiService } from 'src/app/services/db-api.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public displayedColumns: Array<string> = ['lastName', 'firstName'];
  public users: Array<IUser> = new Array<IUser>();

  public constructor(
    private dbApiService: DbApiService,
    public dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.dbApiService.getUsers()
      .subscribe(value => {
        this.users = value;
      });
  }

  /**
   * ユーザー選択時処理。
   *
   * @param user 選択したユーザー。
   */
  public selectUser(user: IUser): void {
    this.dialog.open(UserDetailDialogComponent, { data: { userId: user.id } });
  }

}
