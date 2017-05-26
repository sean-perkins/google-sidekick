import { Component, Input } from '@angular/core';

@Component({
    selector: 'google-nav-button',
    templateUrl: './nav-button.component.html',
    styleUrls: ['./nav-button.component.scss']
})
export class NavButtonComponent {

    @Input() asset: string;

}
