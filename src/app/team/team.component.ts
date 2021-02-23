import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../models/member';
import { Popup } from '../models/popup';
import { TeamPopupComponent } from './team-popup/team-popup.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  members: Member[] = [{
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
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  onSelected(member: Member) {
    this.dialog.open(TeamPopupComponent, {
      data: { title: member.name, subtitle: member.position, img: member.img } as Popup
    })
  }
}
