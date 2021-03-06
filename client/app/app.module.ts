import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';

import { MessageModule } from './messages/message.module';

import { AppComponent }  from './app.component';

import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { ErrorComponent } from './errors/error.component';

import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';


import { AppRoutingModule } from './app.routing';

@NgModule({
  imports:      [ 
                  BrowserModule, 
                  AppRoutingModule,
                  HttpModule,
                  MessageModule
                ],
  declarations: [ 
                  AppComponent,
                  AuthenticationComponent,
                  HeaderComponent,
                  ErrorComponent
                ],
  providers:    [ AuthService, ErrorService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
