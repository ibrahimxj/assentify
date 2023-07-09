import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ArtistSearchComponent } from './components/pages/artist-search/artist-search.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CallbackComponent } from './components/callback/callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ArtistComponent } from './components/pages/artist/artist.component';
import { ArtistAlbumComponent } from './components/artist-album/artist-album.component';
import { ArtistSignupComponent } from './components/pages/artist-signup/artist-signup.component';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ArtistSearchComponent,
    CallbackComponent,
    PageNotFoundComponent,
    ArtistSearchComponent,
    NavbarComponent,
    ProfileComponent,
    ArtistComponent,
    ArtistAlbumComponent,
    ArtistSignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
