import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('top', { static: false }) topEl: ElementRef
  @ViewChild('products', { static: false }) productsEl: ElementRef
  @ViewChild('team', { static: false }) teamEl: ElementRef
  @ViewChild('gallery', { static: false }) galleryEl: ElementRef
  @ViewChild('contact', { static: false }) concactEl: ElementRef
  @ViewChild('hours', { static: false }) hoursEl: ElementRef
  @ViewChild('about', { static: false }) aboutEl: ElementRef
  @ViewChild('location', { static: false }) locationEl: ElementRef
  constructor() { }

  ngOnInit(): void {
  }
  triggerScroll(elementName: string) {
    let element: ElementRef
    switch (elementName) {
      case 'team':
        element = this.teamEl
        break;
      case 'products':
        element = this.productsEl
        break;
      case 'gallery':
        element = this.galleryEl
        break;
      case 'contact':
        element = this.concactEl
        break;
      case 'hours':
        element = this.hoursEl
        break;
      case 'about':
        element = this.aboutEl
        break;
      case 'location':
        element = this.locationEl
        break;
    }
    element.nativeElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  }
}
