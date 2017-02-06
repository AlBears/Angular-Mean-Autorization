import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class AuthService {

    constructor(private _http: Http) { }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type' : 'application/json' });
        return this._http.post('/api/users', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type' : 'application/json' });
        return this._http.post('/api/users/login', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}