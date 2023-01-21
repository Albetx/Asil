import { AuthService } from './../Authentication/auth.service';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { SERVER_URL } from './../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService {

  constructor(http: HttpClient, auth: AuthService) {
    super(SERVER_URL + "/api/v1/products", http);
  }

  getProductsByCategory(category: string){
    return this.http.get(this.url + "/category/" + category)
    .pipe(catchError(this.handleError));
  }

  // Search products by name, Max 100 results
  getProductsBySearchString(search: string){
    return this.http.get(this.url + "/search/" + search)
    .pipe(catchError(this.handleError));
  }

  getProductById(id: number){
    return this.http.get(this.url + "/" + id)
      .pipe(catchError(this.handleError));
  }



  }
