import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

import { User } from './user';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class AuthService {

    constructor(private _http: Http, private errorService: ErrorService) { }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type' : 'application/json' });
        return this._http.post('/api/users', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type' : 'application/json' });
        return this._http.post('/api/users/login', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}