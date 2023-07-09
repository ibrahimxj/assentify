import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotifyApi/spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent {
  constructor(private spotifyService: SpotifyService) {}

  async ngOnInit() {
    try {
      setTimeout(async () => {
        await this.spotifyService.handleCallback();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }
}
