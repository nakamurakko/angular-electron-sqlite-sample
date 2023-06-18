import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GreetingComponent } from './greetings/greeting/greeting.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [
  { path: 'greeting', component: GreetingComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
