import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private service: ServiceService
  ) { }

  ngOnInit(): void {
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
