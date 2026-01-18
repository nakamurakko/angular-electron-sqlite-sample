import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterOutlet } from '@angular/router';

import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  imports: [
    MatProgressSpinnerModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  /** プログレスサービス。 */
  private progressService = inject(ProgressService);
  /** Router。 */
  private router = inject(Router);

  protected readonly title = signal('angular-electron-sqlite-sample');

  /**
   * プログレスの状態を取得する。
   */
  public get progressStatus(): boolean {
    return this.progressService.isShowProgress();
  }

  public ngOnInit(): void {
    void this.router.navigate(['user']);
  }

}
