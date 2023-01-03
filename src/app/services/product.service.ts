import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8080/api/v1/products', http);
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
