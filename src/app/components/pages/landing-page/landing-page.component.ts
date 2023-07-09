import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotifyApi/spotify.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  constructor(private spotifyApiService: SpotifyService) {}

  ngOnInit() {}

  login() {
    this.spotifyApiService.redirectToAuthCodeFlow();
  }
}
