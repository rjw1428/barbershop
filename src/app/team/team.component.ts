import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { AppActions } from '../app.action-types';
import { teamMemberSelector } from '../app.selectors';
import { AppState } from '../models/appState';
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
  team$ = this.store.select(teamMemberSelector)
  @ViewChild('content') content: ElementRef
  triggerAnimation = false
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.team$.pipe(
      first(),
      filter(team => !team.length)
    ).subscribe(() => this.store.dispatch(AppActions.fetchTeamMembers()))
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
      data: { title: member.name, subtitle: member.position, img: member.url } as Popup
    })
  }
}
