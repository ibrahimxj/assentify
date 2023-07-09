import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile';
import { SpotifyService } from 'src/app/services/spotifyApi/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  userProfile!: UserProfile | null;
  noImage = '../../../assets/img/no_image.jpg';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        this.userProfile = await this.spotifyService.fetchProfile(token);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    } else {
      console.error('Invalid or expired access token');
    }
  }
}
