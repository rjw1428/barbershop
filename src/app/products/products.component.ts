import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
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
      price: 40
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
      price: 85
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
  triggerAnimation = false
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.shouldAnimate(window)
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const window = event.target.defaultView
    this.shouldAnimate(window)
  }

  shouldAnimate(window: Window) {
    const top = this.content.nativeElement.getBoundingClientRect().y
    const screenHeigth = window.innerHeight
    if (top < screenHeigth)
      setTimeout(()=>this.triggerAnimation = true)
  }
}
