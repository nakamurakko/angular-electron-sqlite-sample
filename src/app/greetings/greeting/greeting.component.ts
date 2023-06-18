import { GreetingApiService } from 'src/app/services/greeting-api.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent {

  public greetingTo: string = 'Everyone';
  public greeting: string = '';

  public constructor(
    private greetingApiService: GreetingApiService
  ) {
  }

  public onGreetingClick(): void {
    this.greeting = '';

    this.greetingApiService.greeting(this.greetingTo)
      .subscribe(value => {
        this.greeting = value;
      });
  }

}
