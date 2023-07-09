import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { SpotifyService } from 'src/app/services/spotifyApi/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent implements OnInit {
  artistId!: string;
  albums!: Album[];
  token = localStorage.getItem('access_token');

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getArtistAlbums();
  }

  getArtistAlbums(): void {
    this.ActivatedRoute.params.subscribe((params) => {
      this.artistId = params['id'];

      this.spotifyService
        .getArtistAlbums(this.artistId, this.token)
        .then((albums) => {
          this.albums = albums;
        })
        .catch((error) => {
          console.error('Error fetching artist albums:', error);
        });
    });
  }

  goBack() {
    this.router.navigate(['../artist-search']);
  }
}
