import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../models/member';
import { Popup } from '../models/popup';
import { TeamPopupComponent } from './team-popup/team-popup.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnInit, AfterViewInit {
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
  @ViewChild('content') content: ElementRef
  triggerAnimation = false
  constructor(
    private dialog: MatDialog
  ) { }

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const window = event.target
    this.shouldAnimate(window)
  }

  shouldAnimate(window: Window) {
    const top = this.content.nativeElement.getBoundingClientRect().y
    const screenHeigth = window.innerHeight
    const screenOffset = window.pageYOffset
    const screenWidth = window.innerWidth
    if (screenOffset > 0 || top < screenHeigth || screenWidth < 960)
      setTimeout(() => this.triggerAnimation = true)
  }

  onSelected(member: Member) {
    this.dialog.open(TeamPopupComponent, {
      data: { title: member.name, subtitle: member.position, img: member.img } as Popup
    })
  }
}
