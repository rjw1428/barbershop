import { Component, OnInit } from '@angular/core';
import { Hours } from '../models/hours';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {
  hours: Hours[] = [{
    day: "Monday",
    open: "",
    close: "",
    closed: true
  },
  {
    day: "Tuesday",
    open: "",
    close: "",
    closed: true
  }, {
    day: "Wednesday",
    open: "9:00am",
    close: "7:00pm",
    closed: false
  }, {
    day: "Thursday",
    open: "9:00am",
    close: "7:00pm",
    closed: false
  }, {
    day: "Friday",
    open: "9:00am",
    close: "7:00pm",
    closed: false
  }, {
    day: "Saturday",
    open: "9:00am",
    close: "3:00pm",
    closed: false
  }, {
    day: "Sunday",
    open: "",
    close: "",
    closed: true
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
