import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MessageModule } from './messages/message.module';

import { AppComponent }  from './app.component';

import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { ErrorComponent } from './errors/error.component';

import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';


import { AppRoutingModule } from './app.routing';

@NgModule({
  imports:      [ 
                  BrowserModule, 
                  AppRoutingModule,
                  ReactiveFormsModule,
                  HttpModule,
                  MessageModule
                ],
  declarations: [ 
                  AppComponent,
                  AuthenticationComponent,
                  HeaderComponent,
                  LogoutComponent,
                  SigninComponent,
                  SignupComponent,
                  ErrorComponent
                ],
  providers:    [ AuthService, ErrorService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
