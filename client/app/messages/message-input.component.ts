import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message';

@Component({
    moduleId: module.id,
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent{
    constructor(private messageService: MessageService){}
    onSubmit(form:NgForm){
        const message = new Message(form.value.content, 'Hello')
        this.messageService.addMessage(message);
        form.resetForm();
    }
}