import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  images = [
    "assets/media/gallery1.jpg",
    "assets/media/gallery2.jpg",
    "assets/media/gallery3.jpg",
    "assets/media/gallery4.jpg",
    "assets/media/gallery5.jpg",
    "assets/media/gallery6.jpg",
    "assets/media/gallery7.jpg",
    "assets/media/gallery8.jpg"
  ]
  @ViewChild('gallery') mainGallery: ElementRef;
  @ViewChild('upperRow') upperRow: ElementRef;
  @ViewChild('lowerRow') lowerRow: ElementRef;
  @ViewChild('content') content: ElementRef
  triggerAnimation = false
  offsetCount = 0
  itemWidth = 15
  itemMargin = 2
  count = 0
  activeIndex = 0
  interval: any
  continueAutoplayTimeout: any
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.shouldAnimate(window)
    this.startAutoplay()
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

  onPrevious() {
    clearInterval(this.interval)
    clearTimeout(this.continueAutoplayTimeout)
    this.movePrev()
    this.continueAutoplayTimeout = setTimeout(() => this.startAutoplay(), 5000)
  }

  onNext() {
    clearInterval(this.interval)
    clearTimeout(this.continueAutoplayTimeout)
    this.moveNext(true)
    this.continueAutoplayTimeout = setTimeout(() => this.startAutoplay(), 5000)
  }

  startAutoplay() {
    this.interval = setInterval(() => this.moveNext(), 3000)
  }


  moveNext(isManual?: boolean) {
    this.mainGallery.nativeElement.style.transitionProperty = 'all'
    this.upperRow.nativeElement.style.transitionProperty = 'all'
    this.lowerRow.nativeElement.style.transitionProperty = 'all'

    this.offsetCount -= (this.itemWidth + this.itemMargin)
    this.count++
    // this.images.push(this.images[this.activeIndex])
    this.activeIndex = (this.activeIndex + 1) % this.images.length
    this.mainGallery.nativeElement.style.marginLeft = `${this.offsetCount}vw`
    this.upperRow.nativeElement.style.marginLeft = `${this.offsetCount * 2}vw`
    this.lowerRow.nativeElement.style.marginRight = `${this.offsetCount * 2 + this.itemMargin}vw`

    setTimeout(() => {
      const shiftItem = this.images[0]
      this.images.push(shiftItem)
      this.images = this.images.slice(1)
      this.mainGallery.nativeElement.style.transitionProperty = 'none'
      this.mainGallery.nativeElement.style.marginLeft = 0

      this.upperRow.nativeElement.style.transitionProperty = 'none'
      this.upperRow.nativeElement.style.marginLeft = `${this.offsetCount * 0 - this.itemMargin}vw`

      this.lowerRow.nativeElement.style.transitionProperty = 'none'
      this.lowerRow.nativeElement.style.marginRight = `${this.offsetCount * 0 }vw`
      this.offsetCount = 0
    }, 1500)
  }

  movePrev() {
    this.offsetCount += (this.itemWidth + this.itemMargin)
    this.count--
    this.activeIndex = this.activeIndex == 0 ? this.images.length - 1 : (this.activeIndex - 1) % this.images.length
    this.mainGallery.nativeElement.style.marginLeft = `${this.offsetCount}vw`

  }
}
