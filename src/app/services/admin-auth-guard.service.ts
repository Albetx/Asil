import { AuthService } from './../Authentication/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(){
    let user = this.authService.currentUser;
    if (user && this.isAnAdmin(user.roles)) 
      return true;

    this.router.navigate(['/no-access']);
    return false;
  }

  isAnAdmin(roles: string[]){
    return roles.includes("ROLE_ADMIN");
  }
}
