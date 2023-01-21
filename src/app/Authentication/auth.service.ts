import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { SERVER_URL } from './../services/data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signup (credentials: any) {
    const body =  {
        "name": credentials.name,
        "email": credentials.email,
        "password": credentials.password
    };
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

    return this.http.post(SERVER_URL + '/api/users/save', body, {headers: headers})
      .pipe (map((response: any) => {
        console.log(response);
        if (response)
          return true;
        return false;
      }), catchError(this.handleError));
  }

  login (credentials: any) {
    let params = new HttpParams();
    params = params.append('email', credentials.username);
    params = params.append('password', credentials.password);

    return this.http.post(SERVER_URL + '/login', params)
      .pipe(map((response: any) => {
        console.log(response);
        if (response && response.access_token){
          localStorage.setItem('token', response.access_token);
          return true;
        }
        return false;
      }));
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  isLoggedIn(){
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token)
      return false;

    return !jwtHelper.isTokenExpired(token!);
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if (!token) return null;
    
    return new JwtHelperService().decodeToken(token);
  }

  protected handleError (error: Response){
    if (error.status === 400 || error.status === 403){
      window.alert("Bad Input");
      return throwError (() => new BadInput());
    }
    else if (error.status === 404)
      return throwError (() => new NotFoundError());

    return throwError (() =>new AppError(error));
  }

}