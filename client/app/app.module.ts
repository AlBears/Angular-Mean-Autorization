import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';


import { AppRoutingModule } from './app.routing';

@NgModule({
  imports:      [ 
                  BrowserModule, 
                  FormsModule,
                  AppRoutingModule,
                  ReactiveFormsModule
                ],
  declarations: [ 
                  AppComponent,
                  MessageComponent,
                  MessageListComponent,
                  MessageInputComponent,
                  MessagesComponent,
                  AuthenticationComponent,
                  HeaderComponent,
                  LogoutComponent,
                  SigninComponent,
                  SignupComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
