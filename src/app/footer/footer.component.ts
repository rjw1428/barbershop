import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year
  constructor(
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear()
  }

  onInsta() {
    this.service.insta()
  }

  onYelp() {
    this.service.yelp()
  }

  onEmail() {
    this.service.email()
  }
  
  panel1() {
    window.scrollTo({
      top: 900,
      behavior: 'smooth'
    });
  }

  panel2() {
    window.scrollTo({
      top: 1600,
      behavior: 'smooth'
    });
  }


  panel3() {
    window.scrollTo({
      top: 2200,
      behavior: 'smooth'
    });
  }


  panel4() {
    window.scrollTo({
      top: 2600,
      behavior: 'smooth'
    });
  }

  onBook() {
    this.service.book()
  }
}
