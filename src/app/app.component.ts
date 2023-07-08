import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'angular-electron-sqlite-sample';

  /**
   * プログレスの状態を取得する。
   */
  public get progressStatus(): boolean {
    return this.progressService.isShowProgress;
  }

  /**
   * コンストラクター。
   *
   * @param progressService プログレスサービス。
   * @param router Router。
   */
  public constructor(
    private progressService: ProgressService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    void this.router.navigate(['user']);
  }

}
