import { AfterViewInit, ChangeDetectionStrategy, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppActions } from '../app.action-types';
import { hoursSelector } from '../app.selectors';
import { AppState } from '../models/appState';
import { Hours } from '../models/hours';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoursComponent implements OnInit, AfterViewInit {
  hours$ = this.store.select(hoursSelector)
  @ViewChild('content') content: ElementRef
  triggerAnimation = false
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.fetchHours())
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
      setTimeout(() => this.triggerAnimation = true)
  }

  identify(index: number, item: Hours) {
    return item.day
  }
}
