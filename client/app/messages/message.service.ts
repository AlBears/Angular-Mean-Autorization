import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';


import { Message } from './message';

@Injectable()
export class MessageService {
    constructor(private _http: Http){}
    messages: Message[] = [];

    addMessage(message:Message) {

        this.messages.push(message);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = JSON.stringify(message);
        return this._http.post('/messages', body, { headers })
            .map((response) => response.json() )
            .catch((error) => Observable.throw(error.json()));
        
    }

    getMessages() {
        return this.messages;
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }

}