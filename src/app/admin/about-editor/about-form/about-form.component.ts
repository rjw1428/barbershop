import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { About } from 'src/app/models/about';
import { AppState } from 'src/app/models/appState';
import { AdminActions } from '../../admin.action-types';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.scss']
})
export class AboutFormComponent implements OnInit {
  aboutForm: FormGroup
  error: string
  constructor(
    private FormBuilder: FormBuilder,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<AboutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public about: About
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.FormBuilder.group({
      content: this.FormBuilder.array(
        this.about.content.map(paragraph => this.FormBuilder.control(paragraph, Validators.required))
      )
    })
  }

  get content(): FormArray {
    return this.aboutForm.get('content') as FormArray
  }

  onRemove() {
    const lastIndex = this.content.controls.length - 1
    if (lastIndex)
      this.content.removeAt(lastIndex)
    else this.error = "Must have at least 1 paragraph"
  }

  onAdd() {
    this.content.push(new FormControl('', Validators.required))
  }

  onSave() {
    if (!this.aboutForm.valid) return this.error = "A paragraph is blank, either remove or add content"
    const newAbout = { ...this.aboutForm.value, isActive: true, id: new Date().getTime().toString() }
    this.store.dispatch(AdminActions.saveAbout({ about: newAbout }))
    this.dialogRef.close(newAbout)
  }
}
