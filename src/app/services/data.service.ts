import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const SERVER_URL = "http://localhost:8080";
// http://asilspringserver-env.eba-e26dzfyq.us-east-1.elasticbeanstalk.com

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) protected url: string,protected http: HttpClient) { }

  getAll(){
    return this.http.get(this.url)
      .pipe(catchError(this.handleError));
  }

  create(resourse: any){
    return this.http.post(this.url, JSON.stringify(resourse))
    .pipe(catchError(this.handleError));
  }

  update(resourse: any){
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    return this.http.put(this.url + "/" + resourse.id, JSON.stringify(resourse), {headers: headers})
      .pipe(catchError(this.handleError));
  }

  delete(id: number){
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
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
