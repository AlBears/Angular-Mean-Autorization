import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent{
    onSave(data:string){
        console.log(data)
    }
}