import { delay, finalize, mergeMap } from 'rxjs';
import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DbApiService } from 'src/app/services/db-api.service';
import { ProgressService } from 'src/app/services/progress.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';

/**
 * ユーザー情報表示用コンポーネント。
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  /** 一覧のヘッダー。 */
  public displayedColumns: Array<string> = ['lastName', 'firstName'];
  /** ユーザー一覧。 */
  public users: Array<IUser> = new Array<IUser>();

  /**
   * コンストラクター。
   *
   * @param dbApiService DB サービス。
   * @param progressService プログレスサービス。
   * @param dialog ダイアログ。
   */
  public constructor(
    private dbApiService: DbApiService,
    private progressService: ProgressService,
    public dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.progressService.showProgress()
      .pipe(
        mergeMap(() => this.dbApiService.getUsers()),
        // プログレス表示を分かりやすくするために1秒遅延させる。
        delay(1000),
        finalize(() => this.progressService.hideProgress())
      )
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
