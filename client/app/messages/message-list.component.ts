import { Component } from '@angular/core';

import { Message } from './message';

@Component({
    moduleId: module.id,
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message 
                [message]='message'
                (editClicked) = "message.content = $event" 
                *ngFor="let message of messages">
            </app-message>
       </div>
    `
})
export class MessageListComponent {
    messages: Message[] = [
    new Message("message", "alb"),
    new Message("greetings", "sonic"),
    new Message("playground", "boss")
    ];
}