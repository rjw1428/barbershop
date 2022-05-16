import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    pathMatch: 'full',
  }
]
@NgModule({
  declarations: [
    FormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatRadioModule,
    RouterModule.forChild(routes),
  ]
})
export class FormModule { }
