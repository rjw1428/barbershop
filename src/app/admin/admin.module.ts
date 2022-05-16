import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutEditorComponent } from './about-editor/about-editor.component';
import { ProductsEditorComponent } from './products-editor/products-editor.component';
import { HoursEditorComponent } from './hours-editor/hours-editor.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductFormComponent } from './products-editor/product-form/product-form.component';
import { GenericPopupComponent } from './generic-popup/generic-popup.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdminEffects } from './admin.effects';
import { adminReducer } from './admin.reducer';
import { HoursFormComponent } from './hours-editor/hours-form/hours-form.component';
import { AboutFormComponent } from './about-editor/about-form/about-form.component';
import { GalleryEditorComponent } from './gallery-editor/gallery-editor.component';
import { TeamEditorComponent } from './team-editor/team-editor.component';
import { GalleryFormComponent } from './gallery-editor/gallery-form/gallery-form.component';
import { TeamFormComponent } from './team-editor/team-form/team-form.component';
import { DragNDropDirective } from '../shared/drag-n-drop.directive'
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    pathMatch: 'full',
  }
]


@NgModule({
  declarations: [
    AdminComponent,
    AboutEditorComponent,
    ProductsEditorComponent,
    HoursEditorComponent,
    ProductFormComponent,
    GenericPopupComponent,
    HoursFormComponent,
    AboutFormComponent,
    GalleryEditorComponent,
    TeamEditorComponent,
    GalleryFormComponent,
    TeamFormComponent,
    DragNDropDirective
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    MatCheckboxModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([AdminEffects])
  ]
})
export class AdminModule { }
