import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first, map } from 'rxjs/operators';
import { AppActions } from 'src/app/app.action-types';
import { AppState } from 'src/app/models/appState';
import { Member } from 'src/app/models/member';
import { AdminActions } from '../admin.action-types';
import { adminTeamMemberSelector } from '../admin.selectors';
import { GenericPopupComponent } from '../generic-popup/generic-popup.component';
import { UploadService } from '../upload.service';
import { TeamFormComponent } from './team-form/team-form.component';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamEditorComponent implements OnInit {
  team$ = this.store.select(adminTeamMemberSelector)
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.team$.pipe(
      first(),
      filter(team => !team.length)
    ).subscribe(() => this.store.dispatch(AdminActions.fetchTeamMembers()))
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
