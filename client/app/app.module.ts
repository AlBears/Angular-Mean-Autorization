import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';

import { AppRoutingModule } from './app.routing';

@NgModule({
  imports:      [ 
                  BrowserModule, 
                  FormsModule,
                  AppRoutingModule
                ],
  declarations: [ 
                  AppComponent,
                  MessageComponent,
                  MessageListComponent,
                  MessageInputComponent,
                  MessagesComponent,
                  AuthenticationComponent,
                  HeaderComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
