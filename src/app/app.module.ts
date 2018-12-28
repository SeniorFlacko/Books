import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { AuthGuard } from './auth.guard';


firebase.initializeApp(environment.firebase);
firebase.firestore().settings(environment.firestoreSetting);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    SessionService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
