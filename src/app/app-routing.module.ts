import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ArtistSearchComponent } from './components/pages/artist-search/artist-search.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ArtistComponent } from './components/pages/artist/artist.component';
import { ArtistSignupComponent } from './components/pages/artist-signup/artist-signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'artist/:id', component: ArtistComponent, canActivate: [AuthGuard] },
  {
    path: 'artist-search',
    component: ArtistSearchComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'artist-signup',
    component: ArtistSignupComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
