import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Product[] = [
    {
      name: "Men's Cut",
      price: 40
    },
    {
      name: "Beard Trim",
      price: 30
    },
    {
      name: "Men's Cut and Beard Trim",
      price: 60
    },
    {
      name: "Men's Cut and Shave",
      price: 85
    },
    {
      name: "Shave",
      price: 60
    },
    {
      name: "Clipper Cut",
      price: 30
    },
    {
      name: "Kid's Cut (10 and under)",
      price: 30
    },
    {
      name: "Women's Cut",
      price: 50
    },
    {
      name: "Clipper Cut and Beard Trim",
      price: 50
    },
    {
      name: "Men's Long Hair Cut",
      price: 50
    },
    {
      name: "Head Shave and Face Shave",
      price: 100
    },
    {
      name: "Men's Long Hair and Beard Trim",
      price: 85
    },
    {
      name: "Head Shave and Beard Trim",
      price: 85
    }
  ]

  @ViewChild('content') content: ElementRef
  @ViewChild('bg') bg: ElementRef
  triggerAnimation = false
  constructor(
    private ref: ChangeDetectorRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.shouldAnimate(window, true)
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const window = event.target.defaultView as Window
    this.shouldAnimate(window)
    // this.renderer.setStyle(this.bg.nativeElement, 'background-position', `center ${window.scrollY - 300}px`);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const window = event.target
    // console.log(event.target)
    this.shouldAnimate(window)
  }

  shouldAnimate(window: Window, isFirst?: boolean) {
    const top = this.content.nativeElement.getBoundingClientRect().y
    const screenHeigth = window.innerHeight
    const screenWidth = window.innerWidth
    const screenOffset = window.pageYOffset
    if (screenOffset > 0 || top < screenHeigth || screenWidth < 960)
      setTimeout(() => {
        this.triggerAnimation = true
        if (isFirst) this.ref.detectChanges()
      })
  }
}
