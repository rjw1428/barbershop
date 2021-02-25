import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Barbershop Denim';
  @ViewChild('top', { static: false }) topEl: ElementRef
  @ViewChild('gallery', { static: false }) galleryEl: ElementRef
  @ViewChild('middleLarge', { static: false }) middleLargeEl: ElementRef
  @ViewChild('middleSmall', { static: false }) middleSmallEl: ElementRef
  @ViewChild('about', { static: false }) aboutEl: ElementRef
  @ViewChild('location', { static: false }) locationEl: ElementRef
  constructor(
    private service: ServiceService
  ) { }

  triggerScroll(elementName: string) {
    let element: ElementRef
    console.log(elementName)

    switch (elementName) {
      case 'team':
        element = this.topEl
        break;
      case 'products':
        element = this.topEl
        break;
      case 'gallery':
        element = this.galleryEl
        break;
      case 'middleLarge':
        element = this.middleLargeEl
        break;
      case 'middleSmall':
        element = this.middleSmallEl
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
