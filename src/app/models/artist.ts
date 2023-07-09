export interface Artist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  profilePicture: string;
  stageName: string;
  artistBackstory: string;
  startingDate: Date;
  albums: Album[];
}

interface Album {
  albumName: string;
  albumDate: string;
  albumPicture: string;
  songs: Song[];
}

interface Song {
  name: string;
  duration: string;
}
