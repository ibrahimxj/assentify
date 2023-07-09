import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { deleteEntities, setEntities } from '@ngneat/elf-entities';
import { selectAllEntities } from '@ngneat/elf-entities';
import { store } from 'src/app/store/artist.store';
import { Artist } from 'src/app/models/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'https://64a9a6688b9afaf4844af334.mockapi.io/artists';

  constructor(private http: HttpClient) {}

  fetchArtists() {
    return this.http.get<Artist[]>(this.apiUrl).subscribe((artists) => {
      store.update(setEntities(artists));
    });
  }

  logartist() {
    store.pipe(selectAllEntities()).subscribe((artist) => {
      console.log('Added Artist', artist);
    });
  }

  createArtist(artist: Artist) {
    return this.http
      .post<Artist>(this.apiUrl, artist)
      .subscribe((createdArtist) => {
        store.update(setEntities([artist]));
      });
  }

  updateArtist(artist: Artist) {
    return this.http
      .put<Artist>(`${this.apiUrl}/${artist.id}`, artist)
      .subscribe(() => {
        store.update(setEntities([artist]));
      });
  }

  deleteArtist(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      store.update(deleteEntities(id));
    });
  }
}
