import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/models/appState';
import { Hours } from 'src/app/models/hours';
import { AdminActions } from '../../admin.action-types';

@Component({
  selector: 'app-hours-form',
  templateUrl: './hours-form.component.html',
  styleUrls: ['./hours-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoursFormComponent implements OnInit {
  hoursForm: FormGroup
  error: string
  constructor(
    private FormBuilder: FormBuilder,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<HoursFormComponent>,
    @Inject(MAT_DIALOG_DATA) public hours: Hours
  ) { }

  ngOnInit(): void {
    console.log(this.hours)
    this.hoursForm = this.FormBuilder.group({
      open: [{ value: this.hours ? this.hours.open : '', disabled: this.hours.closed }, Validators.required],
      close: [{ value: this.hours ? this.hours.close : '', disabled: this.hours.closed }, Validators.required],
      closed: [this.hours ? this.hours.closed : false]
    })
  }

  onCheck(event: MatCheckboxChange) {
    if (event.checked) {
      this.hoursForm.get('open').disable({ emitEvent: false })
      this.hoursForm.get('close').disable({ emitEvent: false })
    }
    else {
      this.hoursForm.get('open').enable({ emitEvent: false })
      this.hoursForm.get('close').enable({ emitEvent: false })
    }
  }

  onSave() {
    if (!this.hoursForm.valid && !this.hoursForm.get('closed').value)
      return this.error = "Either Add Hours or Mark Closed"

    const updatedHours = this.hoursForm.get('closed').value
      ? { ...this.hours, ...this.hoursForm.value, open: '', close: '' }
      : { ...this.hours, ...this.hoursForm.value }
    this.store.dispatch(AdminActions.updateHours({ hours: updatedHours }))
    this.dialogRef.close()
  }
}
