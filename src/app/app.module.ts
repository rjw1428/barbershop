import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TeamComponent } from './team/team.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { HoursComponent } from './hours/hours.component';
import { LocationComponent } from './location/location.component';
import { FooterComponent } from './footer/footer.component';
import { NavButtonComponent } from './header/nav-button/nav-button.component';
import { TeamMemberComponent } from './team/team-member/team-member.component';
import { ProductComponent } from './products/product/product.component';
import { ContactComponent } from './contact/contact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamPopupComponent } from './team/team-popup/team-popup.component';
import { GalleryImageComponent } from './gallery/gallery-image/gallery-image.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { appReducer } from './app.reducer';
import { AppEffects } from './app.effects';
import { SharedModule } from './shared/shared.module';
import { ProductPopupComponent } from './products/product-popup/product-popup.component';


const prodImports = [
  AngularFireAnalyticsModule
]

const devImports = [
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
]

const defaultImports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  MatDialogModule,
  SharedModule,
  BrowserAnimationsModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireStorageModule,
  StoreModule.forRoot({ app: appReducer }, {
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionSerializability: true
    }
  }),
  EffectsModule.forRoot([AppEffects]),
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamComponent,
    GalleryComponent,
    ProductsComponent,
    AboutComponent,
    HoursComponent,
    LocationComponent,
    FooterComponent,
    NavButtonComponent,
    TeamMemberComponent,
    ProductComponent,
    ProductPopupComponent,
    ContactComponent,
    TeamPopupComponent,
    GalleryImageComponent,
    HomeComponent,
  ],
  imports: environment.production 
    ? [...defaultImports, ...prodImports] 
    : [...defaultImports, ...devImports],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
