import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() onScroll = new EventEmitter<string>()
  year: number
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

  onBook() {
    this.service.book()
  }

  onNavigate(elementId: string) {
    this.onScroll.emit(elementId)
  }
}
