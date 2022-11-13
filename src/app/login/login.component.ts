import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  signIn (credentials: any){
    this.authService.login(credentials)
      .subscribe(result => {
        if (result!){
          let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
          this.router.navigate([returnUrl || '/']);
        }
        else
          this.invalidLogin = true;
      });
  }


}
