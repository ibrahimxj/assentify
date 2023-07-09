export interface Album {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  images: AlbumImage[];
  genres: string[];
  uri: string;
}

export interface AlbumImage {
  height: number;
  width: number;
  url: string;
}
