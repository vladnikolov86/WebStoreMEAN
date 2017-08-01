import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdToolbarModule } from '@angular/material';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { PopoverModule } from "ng2-popover";

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

import { UserService } from './user/user.service';
import { AuthenticationService } from './user/auth.service';
import { CanActivateLogin } from './user/login.guard';
import { CommonService } from './shared/common.service';
import { ToastrService } from './shared/toastr.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainNavigationComponent,
    DesktopNavComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    PopoverModule,
    Ng2DropdownModule
  ],
  providers: [UserService, ToastrService, AuthenticationService, CommonService, CanActivateLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }