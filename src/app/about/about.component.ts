import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit {
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
