import { IUser } from 'src/@types/entities/interfaces/i-user';
import { DbApiService } from 'src/app/services/db-api.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export default class UserComponent implements OnInit {

  public displayedColumns: Array<string> = ['lastName', 'firstName'];
  public users: Array<IUser> = new Array<IUser>();

  public constructor(
    private dbApiService: DbApiService
  ) {
  }

  public ngOnInit(): void {
    this.dbApiService.getUsers()
      .subscribe(value => {
        this.users = value;
      });
  }

}
