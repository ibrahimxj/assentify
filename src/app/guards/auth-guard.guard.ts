import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotifyApi/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      // Check if the access token is valid
      return this.spotifyService
        .isAccessTokenValid(accessToken)
        .then((isValid) => {
          if (isValid) {
            // Access token is valid, allow access to the route
            return true;
          } else {
            // Access token is invalid, redirect to login page
            this.router.navigate(['/landing']);
            return false;
          }
        })
        .catch((error) => {
          console.error('Error checking access token:', error);
          // Handle error case
          return false;
        });
    } else {
      // Access token is not available, redirect to login page
      this.router.navigate(['/landing']);
      return false;
    }
  }
}
