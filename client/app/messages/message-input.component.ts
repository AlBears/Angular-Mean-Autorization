import { Component } from '@angular/core';

import { MessageService } from './message.service';
import { Message } from './message';

@Component({
    moduleId: module.id,
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent{
    constructor(private messageService: MessageService){}
    onSave(data:string){
        console.log(data);
        const message = new Message(data, 'Hello')
        this.messageService.addMessage(message);
    }
}