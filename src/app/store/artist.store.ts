import { Injectable } from '@angular/core';
import { propsArrayFactory, createStore } from '@ngneat/elf';

import {
  selectAllEntities,
  setEntities,
  withEntities,
  selectEntities,
} from '@ngneat/elf-entities';
import { Artist } from '../models/artist';

const {
  withCollectionIds,
  selectCollectionIds,
  addCollectionIds,
  removeCollectionIds,
  inCollectionIds,
} = propsArrayFactory('collectionIds', { initialValue: [] as string[] });

export const store = createStore({ name: 'artist' }, withEntities<Artist>());

@Injectable({ providedIn: 'root' })
export class ArtistsRepository {
  Artist$ = store.pipe(selectAllEntities());

  setArtist(artist: Artist[]) {
    store.update(setEntities(artist));
  }
}