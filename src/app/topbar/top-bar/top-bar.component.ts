import { electron } from './../../../../tasks/utils/electron';
import { NgxElectronService } from './../../ngx-electron/ngx-electron.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'google-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

    windows: any = {
        gmail: true,
        calendar: false,
        drive: false
    };

    constructor(private electron: NgxElectronService) { }

    ngOnInit() {
    }

    gmail(): void {
        this.openWindow('gmail');
    }

    calendar(): void {
        this.openWindow('calendar');
    }

    drive(): void {
        this.openWindow('drive');
    }

    get isGmail(): boolean {
        return this.windows.gmail;
    }

    get isCalendar(): boolean {
        return this.windows.calendar;
    }

    get isDrive(): boolean {
        return this.windows.drive;
    }

    private openWindow(name: string): void {
        for (const key of Object.keys(this.windows)) {
            if (key !== name) {
                this.windows[key] = false;
            } else {
                this.windows[key] = true;
                this.electron.send(key);
            }
        }
    }

}
