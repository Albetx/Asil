import { UserService } from '../services/user.service';
import { AuthService } from './../Authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { AdminAuthGuard } from '../services/admin-auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = "";
  roles: string[] = [];

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private adminAuthGuard: AdminAuthGuard) {}



  ngOnInit(): void {
    let user = this.authService.currentUser;
    console.log(user);

    if (this.authService.currentUser){
      let email = this.authService.currentUser.sub;
      this.userService.getUserByEmail(email)
        .subscribe((result: any) => {
          this.name = result.name;
          this.roles = result.roles;
          for (var role of result.roles){
            if (role)
              this.roles.push(role.name);
          }
          console.log(result);
        })
    }
    else this.name = "Guest";
  }

  get isAnAdmin(){
    return this.adminAuthGuard.isAnAdmin(this.roles);
  }
}

