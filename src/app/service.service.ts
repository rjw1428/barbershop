import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { 

  }

  // getData(): Observable<any> {
  //   return this.http.get('https://api.publicapis.org/categories')
  // }

}
