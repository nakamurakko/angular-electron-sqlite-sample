import { delay, finalize, map, mergeMap, takeWhile, tap } from 'rxjs';

import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IUser } from '../../../@types/entities/interfaces/i-user';
import { DialogResult } from '../../data-types/dialog-result';
import { DbApiService } from '../../services/db-api.service';
import { ProgressService } from '../../services/progress.service';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

/**
 * ユーザー情報表示用コンポーネント。
 */
@Component({
  selector: 'app-user',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {

  private dbApiService = inject(DbApiService);
  private progressService = inject(ProgressService);
  public dialog = inject(MatDialog);

  /** 一覧のヘッダー。 */
  public displayedColumns: string[] = ['lastName', 'firstName', 'showUserDetail', 'editUser'];
  /** ユーザー一覧。 */
  public users = signal<IUser[]>([]);

  public ngOnInit(): void {
    this.progressService.showProgress();
    this.dbApiService.getUsers()
      .pipe(
        // プログレス表示を分かりやすくするために1秒遅延させる。
        delay(1000),
        finalize(() => this.progressService.hideProgress())
      )
      .subscribe(value => {
        this.users.set(value);
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

  /**
   * ユーザーを追加する。
   */
  public addUser(): void {
    this.dialog.open(UserEditDialogComponent)
      .afterClosed()
      .pipe(
        map(x => x as DialogResult),
        takeWhile(x => x === DialogResult.OK),
        tap(() => this.progressService.showProgress()),
        mergeMap(() => this.dbApiService.getUsers()),
        // プログレス表示を分かりやすくするために1秒遅延させる。
        delay(1000),
        finalize(() => this.progressService.hideProgress())
      )
      .subscribe(value => {
        this.users.set(value);
      });
  }

  /**
   * ユーザーを編集する。
   *
   * @param user 選択したユーザー。
   */
  public editUser(user: IUser): void {
    this.dialog.open(UserEditDialogComponent, { data: { user: user } })
      .afterClosed()
      .pipe(
        map(x => x as DialogResult),
        takeWhile(x => x === DialogResult.OK),
        tap(() => this.progressService.showProgress()),
        mergeMap(() => this.dbApiService.getUsers()),
        // プログレス表示を分かりやすくするために1秒遅延させる。
        delay(1000),
        finalize(() => this.progressService.hideProgress())
      )
      .subscribe(value => {
        this.users.set(value);
      });
  }

}
