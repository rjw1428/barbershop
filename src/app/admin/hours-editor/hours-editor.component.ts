import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppActions } from 'src/app/app.action-types';
import { hoursSelector } from 'src/app/app.selectors';
import { AppState } from 'src/app/models/appState';
import { Hours } from 'src/app/models/hours';
import { HoursFormComponent } from './hours-form/hours-form.component';

@Component({
  selector: 'app-hours-editor',
  templateUrl: './hours-editor.component.html',
  styleUrls: ['./hours-editor.component.scss']
})
export class HoursEditorComponent implements OnInit {
  hours$ = this.store.select(hoursSelector)
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.fetchHours())
  }

  identify(index: number, item: Hours) {
    return item.day
  }

  onAdd() {
    this.dialog.open(HoursFormComponent)
  }

  onEdit(hours: Hours) {
    this.dialog.open(HoursFormComponent, {
      data: hours
    })
  }
}
