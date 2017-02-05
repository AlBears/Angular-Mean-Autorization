import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';
import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    constructor(private authservice: AuthService, private router: Router){}
    myForm: FormGroup;

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authservice.signin(user)
            .subscribe(
                (response) => {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('userId', response.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
                )
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}