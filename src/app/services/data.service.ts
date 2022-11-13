import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private url: string,private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url)
      .pipe(catchError(this.handleError));
  }

  getProductsByCategory(category: string){
    return this.http.get(this.url + "/category/" + category)
    .pipe(catchError(this.handleError));
  }

  getById(id: number){
    return this.http.get(this.url + "/" + id)
      .pipe(catchError(this.handleError));
  }

  getByEmail(email: string){
    return this.http.get(this.url + "/users" , {params: {email}})
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

  private handleError (error: Response){
    if (error.status === 400)
      return throwError (new BadInput(error.json()));
    else if (error.status === 404)
      return throwError (new NotFoundError());

    return throwError (new AppError(error));
  }
}
