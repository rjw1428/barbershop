import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { noop, Observable } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, takeWhile, tap } from 'rxjs/operators';
import { About } from 'src/app/models/about';
import { AdminState } from 'src/app/models/adminState';
import { AppState } from 'src/app/models/appState';
import { AdminActions } from '../admin.action-types';
import { allAboutSelector, singleAboutSelector } from '../admin.selectors';
import { AboutFormComponent } from './about-form/about-form.component';

@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.scss']
})
export class AboutEditorComponent implements OnInit, OnDestroy {
  about$ = this.store.select(allAboutSelector)
  selectedAbout$: Observable<About>
  versionSelector: FormControl
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnDestroy() {
    console.log("DESTROYED ABOUT")
  }

  ngOnInit(): void {
    this.versionSelector = new FormControl('')
    this.store.dispatch(AdminActions.fetchAllAbouts())

    // Set Selected Value (Content)
    this.selectedAbout$ = this.versionSelector.valueChanges.pipe(
      switchMap(aboutId => this.store.select(singleAboutSelector, aboutId)),
      tap(id => console.log(id))
    )
    // Set default selected version
    this.about$.pipe(
      filter(abouts => !!abouts.length && abouts.some(abouts => abouts.isActive)),
      map(abouts => abouts.find(about => about.isActive))
    ).subscribe(about => this.versionSelector.setValue(about.id))


  }

  onSetActive(selectedAboutId: string) {
    this.store.pipe(
      first(),
      map(state =>
        Object.values(state.admin.about)
          .find(about => about.isActive)
      ),
      map(currentActive => currentActive.id)
    ).subscribe(currentActiveId => {
      this.store.dispatch(AdminActions.setActiveAbout({ currentActiveId, selectedAboutId }))

    })
  }

  onEdit() {
    const selectedId = this.versionSelector.value
    this.about$.pipe(
      first(),
      map(abouts => abouts.find(about => about.id == selectedId)),
      switchMap(about => {
        return this.dialog.open(AboutFormComponent, {
          data: about
        }).afterClosed()
      }),
      filter(resp => !!resp),
    ).subscribe(noop)

  }
}
