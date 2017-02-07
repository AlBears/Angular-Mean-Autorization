import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li routerLinkActive = "active">
                        <a [routerLink] = "['/messages']">Messenger</a>
                    </li>
			        <li routerLinkActive = "active">
                        <a [routerLink] = "['/auth']">Authentication</a>
                    </li>
                    <li class="pull-right" *ngIf="fetchUser()">
                        <a>Welcome: {{fetchUser()}}</a>
                    </li>
                </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent {
  
    constructor() { }

    fetchUser() {
        return localStorage.getItem('username');
    }

}