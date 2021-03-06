import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';


import { Message } from './message';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class MessageService {
    constructor(private _http: Http, private errorService: ErrorService){}
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    addMessage(message:Message) {

        const token = localStorage.getItem('token');
        const headers = new Headers({'Accept': 'application/json'});
        headers.append('Content-type', 'application/json');
        headers.append('x-auth', token);
        const body = JSON.stringify(message); 
        return this._http.post('/api/messages', body, { headers })
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.content, 
                    result.obj.user.firstName, 
                    result.obj._id, 
                    result.obj.user._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
        
    }

    getMessages() {
        return this._http.get('/api/messages')
            .map((response: Response) => {
                const messages = response.json().messages;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.content, 
                        message.user.firstName, 
                        message._id, 
                        message.user._id
                        ));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    deleteMessage(message: Message) {
        
        const token = localStorage.getItem('token');
        const headers = new Headers({'Accept': 'application/json'});
        headers.append('x-auth', token);
        return this._http.delete(`/api/messages/${message.messageId}`, { headers })
            .map((response: Response) => {
                this.messages.splice(this.messages.indexOf(message), 1);
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const token = localStorage.getItem('token');
        const headers = new Headers({'Accept': 'application/json'});
        headers.append('Content-type', 'application/json');
        headers.append('x-auth', token);
        const body = JSON.stringify(message);
        return this._http.patch(`/api/messages/${message.messageId}`, body, { headers })
            .map((response: Response) => response.json() )
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

}