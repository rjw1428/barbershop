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

  onBook() {
    this.service.book()
  }

}
