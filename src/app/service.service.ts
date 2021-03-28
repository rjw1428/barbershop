import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    
  ) {

  }

  book() {
    window.location.href = "https://booksy.com/en-us/90270_barbershop-denim_barber-shop_134598_philadelphia"
  }

  insta() {
    window.location.href = "https://www.instagram.com/barbershopdenim1517/"
  }

  yelp() {
    window.location.href = "https://www.yelp.com/biz/barbershop-denim-philadelphia?osq=barbershop+denim"
  }

  email() {
    window.location.href = "mailto:BarbershopDenim@gmail.com?subject=Getting in touch"
  }
}
