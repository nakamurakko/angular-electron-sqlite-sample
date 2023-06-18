import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greetings/greeting/greeting.component';
import { UserComponent } from './users/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
