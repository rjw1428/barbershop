import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  members = [{
    name: "Chris Cahill",
    position: "Owner & Barber",
    img: "/assets/media/chris.jpeg"
  },
  {
    name: "Keith Conroy",
    position: "Barber",
    img: "/assets/media/keith.jpeg"
  },
  {
    name: "Nina Jennings",
    position: "Barber",
    img: "/assets/media/nina.jpeg"
  },
  {
    name: "Brian Curran",
    position: "Barber",
    img: "/assets/media/brian.jpeg"
  },
  {
    name: "Rachael",
    position: "Management & Scheduling",
    img: "/assets/media/rachael.png"
  },
  {
    name: "Haley",
    position: "Management & Scheduling",
    img: "/assets/media/haley.png"
  }] 
  constructor() { }

  ngOnInit(): void {
  }

}
