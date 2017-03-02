import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LogoutComponent } from './logout.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';

import { authRouting } from './auth.routing';

@NgModule({
    declarations: [
            LogoutComponent,
            SigninComponent,
            SignupComponent, 
            ],
    imports: [
            ReactiveFormsModule,
            CommonModule,
            authRouting
             ]
})
export class AuthModule {

}