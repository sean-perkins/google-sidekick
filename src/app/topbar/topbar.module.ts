import { NgxElectronModule } from './../ngx-electron/ngx-electron.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavButtonComponent } from './nav-button/nav-button.component';

@NgModule({
  imports: [
    CommonModule,
    NgxElectronModule
  ],
  declarations: [TopBarComponent, NavButtonComponent],
  exports: [TopBarComponent]
})
export class TopBarModule { }
