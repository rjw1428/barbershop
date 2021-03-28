import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from './app.action-types';
import { AppState } from './models/appState';
import { ServiceService } from './service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(AppActions.checkUserPersistance())
  }

  ngAfterViewInit() {
  }


}
