import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AdminActions } from '../admin/admin.action-types';
import { AppState } from '../models/appState';
import { LoginActions } from './login.action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  login: FormGroup
  error: string
  authError$ = this.store.pipe(map(state => state.login.error))
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  @HostListener('document:keypress', ['$event'])
  onKeypressHandler(event: KeyboardEvent) {
    if (event.code == 'Enter')
      this.onSubmit()
  }

  ngOnDestroy() {
    this.store.dispatch(LoginActions.throwLoginError({ message: null }))
  }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.login.invalid) {
      console.log("FORM INVALID")
      this.error = "The username and password were not recognised"
      return
    }

    this.store.dispatch(LoginActions.login({ ...this.login.value }))
  }
}
