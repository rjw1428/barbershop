import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '../app.action-types';
import { productsSelector } from '../app.selectors';
import { AppState } from '../models/appState';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products$ = this.store.select(productsSelector)
  @ViewChild('content') content: ElementRef
  @ViewChild('bg') bg: ElementRef
  triggerAnimation = false
  constructor(
    private store: Store<AppState>,
    private ref: ChangeDetectorRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.fetchProducts())
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

  identify(index: number, item: Product) {
    return item.name
  }
}
