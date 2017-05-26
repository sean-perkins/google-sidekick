import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// electron
import { NgxElectronModule } from './ngx-electron/ngx-electron.module';
// app
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { TopBarModule } from './topbar/topbar.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgxElectronModule,
        SidebarModule,
        TopBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
