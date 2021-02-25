import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('menu') navMenu: ElementRef
  @ViewChild('other') hiddenLayer: ElementRef
  @Output() onScroll = new EventEmitter<string>()
  @ViewChild('content') content: ElementRef
  triggerAnimation = false
  isTooNarrow = true
  constructor(
    private service: ServiceService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.shouldAnimate(window, true)
    setTimeout(() => {
      this.isTooNarrow = window.innerWidth < 960
      this.ref.detectChanges()
    })
  }


  @HostListener('window:scroll', ['$event'])
  onScrollEvent(event) {
    const window = event.target.defaultView
    this.shouldAnimate(window)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const window = event.target
    this.shouldAnimate(window)
  }

  shouldAnimate(window: Window, isFirst?: boolean) {
    if (window.pageYOffset > 0 || window.innerWidth < 960)
      setTimeout(() => {
        this.triggerAnimation = true
        if (isFirst) this.ref.detectChanges()
      })

    // window.pageYOffset > 0
    //   ? setTimeout(() => this.triggerAnimation = true)
    //   : setTimeout(() => this.triggerAnimation = false)
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

  onBook() {
    this.service.book()
  }

  onNavigate(elementId: string) {
    this.onClose()
    this.onScroll.emit(elementId)
  }
}
