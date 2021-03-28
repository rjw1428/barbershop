import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
