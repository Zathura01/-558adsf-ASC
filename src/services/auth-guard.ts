import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserActivity } from '../services/user-activity';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userActivity: UserActivity, private router: Router) {}

  canActivate(): boolean {
    // Check if JWT exists in your service
    if (this.userActivity.jwtToken) {
      return true; // allow access
    } else {
      this.router.navigate(['']); // redirect to login/home
      return false;
    }
  }
}
