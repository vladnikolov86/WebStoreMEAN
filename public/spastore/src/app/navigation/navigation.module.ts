import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {Ng2DropdownModule} from 'ng2-material-dropdown';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {PopoverModule} from "ng2-popover";

import { HeaderComponent } from './header/header.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainNavigationComponent,
    DesktopNavComponent
  ],
  imports:[
      RouterModule,
      CommonModule,
      Ng2DropdownModule,
      PopoverModule,
      MaterialModule,
      MdNativeDateModule
  ],
   exports: [HeaderComponent]
})

export class NavigationModule { }