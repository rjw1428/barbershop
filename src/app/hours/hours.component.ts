import { AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Hours } from '../models/hours';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit, AfterViewInit {
  hours: Hours[] = [{
    day: "Monday",
    dayShort: "Mon",
    open: "",
    close: "",
    closed: true
  }, {
    day: "Tuesday",
    dayShort: "Tue",
    open: "",
    close: "",
    closed: true
  }, {
    day: "Wednesday",
    dayShort: "Wed",
    open: "9:00am",
    close: "7:00pm",
    closed: false
  }, {
    day: "Thursday",
    dayShort: "Thur",
    open: "9:00am",
    close: "7:00pm",
    closed: false
  }, {
    day: "Friday",
    dayShort: "Fri",
    open: "9:00am",
    close: "7:00pm",
    closed: false
  }, {
    day: "Saturday",
    dayShort: "Sat",
    open: "9:00am",
    close: "3:00pm",
    closed: false
  }, {
    day: "Sunday",
    dayShort: "Sun",
    open: "",
    close: "",
    closed: true
  }]
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
      setTimeout(() => this.triggerAnimation = true)
  }
}
