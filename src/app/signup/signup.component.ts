import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, empty, throwError } from 'rxjs';
import { AuthService } from '../Authentication/auth.service';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  invalidInput: boolean = false;
  passwordsMatch : boolean = true;
  passwordValid : boolean = true;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  signUp (credentials: any){
    // In case an error from the server
    this.authService.signup(credentials)
      .pipe(
        catchError((error) => {
          if (error instanceof BadInput){
            this.invalidInput = true;
          }
        return EMPTY;
        })
      )
      .subscribe(result => {
        if (result){
          window.alert("Sigened up seccessfuly, now please log in");
          let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
          if (!returnUrl)
            returnUrl = "/";
          location.href = returnUrl;
        }
        else
          this.invalidInput = true;
      });
  }


  checkPassword(credentials: any){
    // If the server returns an error, supply info about invalid input.
    if (this.invalidInput){
      if (credentials.password != credentials.passwordConf)
      this.passwordsMatch = false;
      else 
        this.passwordsMatch = true;

      if ((credentials.password).length < 6 || (credentials.password).length > 12)
        this.passwordValid = false;
      else 
        this.passwordValid = true;
    }

  }
}


