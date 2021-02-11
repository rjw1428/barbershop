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

  book() {
    window.location.href ="https://booksy.com/en-us/90270_barbershop-denim_barber-shop_134598_philadelphia"
  }

}
