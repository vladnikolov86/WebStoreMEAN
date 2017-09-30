import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MdToolbarModule} from '@angular/material';
import {MaterialModule, MdNativeDateModule} from '@angular/material';


import {AppRoutingModule} from './app.routing.module';
import {NavigationModule} from './navigation/navigation.module';

import {AppComponent} from './app.component';

import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';

import {UserService} from './user/services/user.service';
import {AuthenticationService} from './user/services/auth.service';
import {CanActivateLogin} from './user/services/login.guard';
import {CommonService} from './shared/services/common.service';
import {ToastrService} from './shared/services/toastr.service';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    NavigationModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule
  ],
  providers: [UserService, ToastrService, AuthenticationService, CommonService, CanActivateLogin],
  bootstrap: [AppComponent]
})
export class AppModule {}