import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterOutlet } from '@angular/router';

import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
