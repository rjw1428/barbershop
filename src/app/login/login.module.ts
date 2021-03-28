import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginEffects } from './login.effects';
import { EffectsModule } from '@ngrx/effects';
import { loginReducer } from './login.reducer';
import { StoreModule } from '@ngrx/store';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [
    NewUserComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginModule { }
