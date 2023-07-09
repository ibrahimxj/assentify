import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-artist-album',
  templateUrl: './artist-album.component.html'
})
export class ArtistAlbumComponent {
  @Input() album!: Album;
  noImage = '../../../assets/img/no_image.jpg';
  constructor(private router: Router) {}

  viewAlbum(url: string): void {
    window.location.href = url;
  }
}
