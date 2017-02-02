import { Injectable } from '@angular/core';

import { Message } from './message';

@Injectable()
export class MessageService {
    messages: Message[] = [];

    addMessage(message:Message) {
        this.messages.push(message);
        console.log(this.messages);
    }

    getMessages() {
        return this.messages;
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }

}