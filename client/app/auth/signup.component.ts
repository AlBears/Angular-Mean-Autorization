import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
    moduleId: module.id,
    selector: 'app-signup',
    templateUrl: './signup.component.html'
    
})
export class SignupComponent implements OnInit{
    
    constructor(private authservice: AuthService){}

    myForm: FormGroup;

    onSubmit() {
        const user = new User( 
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            
        );
        this.authservice.signup(user)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                                            Validators.required,
                                            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                                        ]),
            password: new FormControl(null, Validators.required)
        });
    }
}