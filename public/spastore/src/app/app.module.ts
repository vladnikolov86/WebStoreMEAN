import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {MdToolbarModule} from '@angular/material';
import {MaterialModule, MdNativeDateModule} from '@angular/material';

import {PopoverModule} from "ng2-popover";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainNavigationComponent,
    DesktopNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    PopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
