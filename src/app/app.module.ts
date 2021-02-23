import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
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
    ContactComponent,
    TeamPopupComponent,
    GalleryImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
