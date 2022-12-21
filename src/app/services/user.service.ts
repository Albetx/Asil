import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

const token = localStorage.getItem('token');
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Authorization': "Bearer "+ token
  })
};

@Injectable({
    providedIn: 'root'
  })
  export class UserService extends DataService {
  
    constructor(http: HttpClient) {
      super('http://localhost:8080/api/users', http);
    }
  
    // Getting user by email address
    getUserByEmail(email: string){
      return this.http.get(this.url , {params: {email}})
        .pipe(catchError(this.handleError));
    }

    // Saves a product to users favorite products
    saveProductToUserFav (email:string, productID:number){
      return this.http.post(this.url + "/saveproduct", {"email": email, "productId": productID}, options)
        .pipe(catchError(this.handleError));
    }

    // Removes a product to users favorite products
    removeProductToUserFav (email:string, productID:number){
      return this.http.post(this.url + "/removeproduct", {"email": email, "productId": productID}, options)
        .pipe(catchError(this.handleError));
    }
  }