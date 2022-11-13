import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class ApiService extends DataService {
  
    constructor(http: HttpClient) {
      super('http://localhost:8080/api', http);
    }
  
  }