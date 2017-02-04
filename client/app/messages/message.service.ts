import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';


import { Message } from './message';

@Injectable()
export class MessageService {
    constructor(private _http: Http){}
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    addMessage(message:Message) {

        this.messages.push(message);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = JSON.stringify(message);
        return this._http.post('/api/messages', body, { headers })
            .map((response: Response) => response.json() )
            .catch((error: Response) => Observable.throw(error.json()));
        
    }

    getMessages() {
        return this._http.get('/api/messages')
            .map((response: Response) => {
                const messages = response.json().messages;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, 'Dummy', message._id, null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        return this._http.delete(`/api/messages/${message.messageId}`)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = JSON.stringify(message);
        return this._http.patch(`/api/messages/${message.messageId}`, body, { headers })
            .map((response: Response) => response.json() )
            .catch((error: Response) => Observable.throw(error.json()));
    }

}