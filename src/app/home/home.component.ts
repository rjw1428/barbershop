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

  @ViewChild('menu') navMenu: ElementRef
  @ViewChild('other') hiddenLayer: ElementRef
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

  onOpen() {
    this.navMenu.nativeElement.style.width = "500px";
    this.hiddenLayer.nativeElement.style.zIndex = "500"
    this.hiddenLayer.nativeElement.style.backgroundColor = "rgba(0,0,0,.5)"
  }

  onClose() {
    this.navMenu.nativeElement.style.width = 0;
    this.hiddenLayer.nativeElement.style.zIndex = 0
    this.hiddenLayer.nativeElement.style.backgroundColor = "rgba(0,0,0,0)"
  }

  onNavigate(elementId: string) {
    this.onClose()
    this.triggerScroll(elementId)
  }
}
