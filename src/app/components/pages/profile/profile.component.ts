import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile';
import { SpotifyService } from 'src/app/services/spotifyApi/spotify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.checkAccessToken();
  }

  async checkAccessToken(): Promise<void> {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const isValid = await this.spotifyService.isAccessTokenValid(token);
        if (isValid) {
          this.fetchUserProfile();
        } else {
          this.spotifyService.logout();
        }
      } else {
        this.spotifyService.logout();
      }
    } catch (error) {
      console.error('Error checking access token:', error);
      this.spotifyService.logout();
    }
  }

  async fetchUserProfile(): Promise<void> {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.userProfile = await this.spotifyService.fetchProfile(token);
      } else {
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  }

  logout() {
    this.spotifyService.logout();
  }

  goBack() {
    this.router.navigate(['../artist-search']);
  }

  checkArtists() {
    window.open('https://64a9a6688b9afaf4844af334.mockapi.io/artists', '_blank');
  }
}
