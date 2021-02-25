import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Barbershop Denim';
  @ViewChild('top', { static: false }) topEl: ElementRef
  @ViewChild('products', { static: false }) productsEl: ElementRef
  @ViewChild('team', { static: false }) teamEl: ElementRef
  @ViewChild('gallery', { static: false }) galleryEl: ElementRef
  @ViewChild('contact', { static: false }) concactEl: ElementRef
  @ViewChild('hours', { static: false }) hoursEl: ElementRef
  @ViewChild('about', { static: false }) aboutEl: ElementRef
  @ViewChild('location', { static: false }) locationEl: ElementRef
  constructor(
    private service: ServiceService
  ) { }

  ngAfterViewInit() {
  }

  triggerScroll(elementName: string) {
    let element: ElementRef
    console.log(elementName)
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

    console.log(element.nativeElement)
    element.nativeElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  }
}
