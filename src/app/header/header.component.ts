import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('menu') navMenu: ElementRef
  @ViewChild('other') hiddenLayer: ElementRef
  constructor(
    private service: ServiceService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
    this.onClose()
  }

  panel2() {
    window.scrollTo({
      top: 1600,
      behavior: 'smooth'
    });
    this.onClose()
  }


  panel3() {
    window.scrollTo({
      top: 2200,
      behavior: 'smooth'
    });
    this.onClose()
  }


  panel4() {
    window.scrollTo({
      top: 2600,
      behavior: 'smooth'
    });
    this.onClose()
  }

  onBook() {
    this.service.book()
  }
}
