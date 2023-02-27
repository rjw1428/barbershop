import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() onScroll = new EventEmitter<string>()
  @ViewChild('content') content: ElementRef
  triggerAnimation$ = new BehaviorSubject('NO')
  isTooNarrow$ = new BehaviorSubject('YES')
  isMobile$ = new BehaviorSubject('YES')
  showMargins$ = combineLatest([
    this.triggerAnimation$.pipe(map(val => val === 'YES')),
    this.isMobile$.pipe(map(val => val === 'YES')),
  ]).pipe(
    map(([scrollEvent, isMobile]) => {
      if (isMobile && scrollEvent) return true
      if (!isMobile) return true
      return false
    }),
    map(shouldShow => shouldShow ? 'YES' : 'NO'),
  )
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
    if (window.pageYOffset > 0)
        this.triggerAnimation$.next('YES')
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
    this.onScroll.emit(elementId)
  }
}
