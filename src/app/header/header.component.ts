import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') navMenu: ElementRef
  @ViewChild('other') hiddenLayer: ElementRef
  @Output() onScroll = new EventEmitter<string>()
  @ViewChild('content') content: ElementRef
  triggerAnimation$ = new BehaviorSubject('NO')
  isTooNarrow$ = new BehaviorSubject('YES')
  isMobile$ = new BehaviorSubject('YES')
  constructor(
    private service: ServiceService,
  ) { }

  ngOnInit(): void {
    this.isTooNarrow$.next(window.innerWidth < 960 ? 'YES' : 'NO')
    this.isMobile$.next(window.innerWidth < 600 ? 'YES' : 'NO')
    this.shouldAnimate(window)
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent(event) {
    const window = event.target.defaultView
    this.shouldAnimate(window)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const window = event.target
    this.isTooNarrow$.next(window.innerWidth < 960 ? 'YES' : 'NO')
    this.isMobile$.next(window.innerWidth < 600 ? 'YES' : 'NO')
    this.shouldAnimate(window)
  }

  shouldAnimate(window: Window) {
    if (window.pageYOffset > 0 || window.innerWidth < 960)
        this.triggerAnimation$.next('YES')
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
