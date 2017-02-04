import { Component, OnInit } from '@angular/core';

import { Message } from './message';
import { MessageService } from './message.service';

@Component({
    moduleId: module.id,
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message 
                [message]='message'
                *ngFor="let message of messages">
            </app-message>
       </div>
    `
})
export class MessageListComponent implements OnInit {
    constructor(private messageService: MessageService){}
    messages: Message[] = [];

    ngOnInit(){
      this.messageService.getMessages()
        .subscribe(
            (messages) => this.messages = messages
           
        );
        console.log(this.messages)
        
    };

   
   
}