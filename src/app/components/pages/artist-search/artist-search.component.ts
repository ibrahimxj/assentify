import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile';
import { SpotifyService } from 'src/app/services/spotifyApi/spotify.service';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
})
export class ArtistSearchComponent {
  artists = [
    {
      name: 'Bob',
      rating: 5,
      followers: 69,
    },
    {
      name: 'Lil Wayne',
      rating: 3,
      followers: 69,
    },
    {
      name: 'Lil Najjar',
      rating: 4.5,
      followers: 69,
    },
    {
      name: 'Drake',
      rating: 5,
      followers: 69,
    },
    {
      name: 'Puss in Boots',
      rating: 5,
      followers: 69,
    },
  ];
  userProfile: UserProfile | null = null;
  searchControl = new FormControl();
  searchResults: any[] = [];
  onSearchDownEnabled: boolean = false;
  artist: any;
  noImage = '../../../assets/img/no_image.jpg';
  selectedRating!: number;

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
        // Handle case when access token is not available
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Handle error case
    }
  }

  onSearch(): void {
    const keyword = this.searchControl.value;
    const type = 'artist'; // Specify the type you want to search for

    if (keyword) {
      const token = localStorage.getItem('access_token');
      this.spotifyService.search(keyword, type, token).subscribe(
        (response) => {
          this.searchResults = response.artists.items;
        },
        (error) => {
          console.log('Error occurred while searching:', error);
        }
      );
    } else {
      // Clear the search results if the keyword is empty
      this.searchResults = [];
    }
  }

  onSearchKeyDown(event: any): void {
    const keyword = event.target.value;
    const type = 'artist'; // Specify the type you want to search for

    if (keyword) {
      const token = localStorage.getItem('access_token');
      this.spotifyService.search(keyword, type, token).subscribe(
        (results) => {
          this.searchResults = results.artists.items;
        },
        (error) => {
          console.error('Error searching:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  floorRating(rating: number): number {
    return Math.floor(rating);
  }

  viewArtist(artistId: string): void {
    this.router.navigate(['/artist', artistId]);
  }

  calculateRating(popularity: number): number {
    const maxRating = 5;
    const popularityPercentage = popularity / 100;
    const rating = popularityPercentage * maxRating;
    return Math.round(rating * 2) / 2;
  }
  clearsearch() {
    this.searchResults = [];
    this.searchControl.reset();
  }

  logout() {
    this.spotifyService.logout();
  }
}
