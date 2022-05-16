import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { AppActions } from 'src/app/app.action-types';
import { joinBannerTextSelector, showJoinBannerSelector } from 'src/app/app.selectors';
import { AppState } from 'src/app/models/appState';
import { Member } from 'src/app/models/member';
import { AdminActions } from '../admin.action-types';
import { adminTeamMemberSelector } from '../admin.selectors';
import { GenericPopupComponent } from '../generic-popup/generic-popup.component';
import { TeamFormComponent } from './team-form/team-form.component';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamEditorComponent implements OnInit, OnDestroy {
  team$ = this.store.select(adminTeamMemberSelector)
  showJoinBanner$ = this.store.select(showJoinBannerSelector)
  joinBannerText$ = this.store.select(joinBannerTextSelector)
  form = new FormGroup({
    joinBannerText: new FormControl(''),
    showJoinBanner: new FormControl(false),
  })
  destroy$ = new Subject()
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();    
  }

  ngOnInit(): void {
    this.store.dispatch(AppActions.fetchShowJoinBanner())
    this.store.dispatch(AppActions.fetchJoinBannerText())
    this.team$.pipe(
      first(),
      filter(team => !team.length)
    ).subscribe(() => this.store.dispatch(AdminActions.fetchTeamMembers()))

    combineLatest([this.showJoinBanner$, this.joinBannerText$]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([showJoinBanner, joinBannerText]) => this.form.setValue({showJoinBanner, joinBannerText}, {emitEvent: false}))
  }

  toggleBanner() {
    this.store.dispatch(AdminActions.toggleBanner({
      showJoinBanner: this.form.value['showJoinBanner']
    }))
  }

  onSaveText() {
    this.store.dispatch(AdminActions.updateBannerText({
      joinBannerText: this.form.value['joinBannerText']
    }))
  }

  onAdd() {
    this.dialog.open(TeamFormComponent)
  }

  onEdit(memberObj: Member) {
    this.dialog.open(TeamFormComponent, {
      data: memberObj
    })
  }

  onRemove(memberObj) {
    const { url, ...member } = memberObj
    this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Are you sure?',
        content: `<p style="color: black; font-weight: 700;">You are about to delete ${member.name}</p>`,
        actionLabel: 'Delete',
        action: () => this.store.dispatch(AdminActions.deleteMember({ member }))
      }
    })
  }
}
