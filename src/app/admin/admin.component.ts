import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/appState';
import { AdminActions } from './admin.action-types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }
  onLogOut() {
    this.store.dispatch(AdminActions.logOut())
  }
}
