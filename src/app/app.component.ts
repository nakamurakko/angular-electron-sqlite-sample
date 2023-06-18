import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'angular-electron-sqlite-sample';

  public constructor(
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    void this.router.navigate(['greeting']);
  }

}
