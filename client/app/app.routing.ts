import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: 'app/auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

