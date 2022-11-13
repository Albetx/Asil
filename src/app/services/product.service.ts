import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8080/api/v1/products', http);
  }

}
