import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class CanActivateLogin implements CanActivate {

  constructor(private authService: AuthenticationService) {}

  canActivate() {
    return !this.authService.isLogged;
  }
}