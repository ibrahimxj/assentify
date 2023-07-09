import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/services/artistservice/artist-service.service';

@Component({
  selector: 'app-artist-signup',
  templateUrl: './artist-signup.component.html',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ArtistSignupComponent implements OnInit {
  artistForm!: FormGroup;
  basicInfoForm!: FormGroup;
  personalInfoForm!: FormGroup;
  artistProfileForm!: FormGroup;
  albumsForm!: FormArray;
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  isDragOver: boolean = false;
  imagePreview: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private ArtistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.basicInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.personalInfoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(03|71|76)\d{6}$/)],
      ],
      dateOfBirth: ['', [Validators.required, this.minAgeValidator(25)]],
    });

    this.artistProfileForm = this.formBuilder.group({
      profilePicture: ['', [Validators.required]],
      stageName: [''],
      artistBackstory: [''],
      startingDate: [''],
    });

    this.albumsForm = this.formBuilder.array([]);

    this.artistForm = this.formBuilder.group({
      basicInfo: this.basicInfoForm,
      personalInfo: this.personalInfoForm,
      artistProfile: this.artistProfileForm,
      albums: this.albumsForm,
    });
  }

  get artist(): any {
    return this.artistForm;
  }

  get firstName(): FormControl {
    return this.basicInfoForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.basicInfoForm.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.personalInfoForm.get('email') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.personalInfoForm.get('phoneNumber') as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.personalInfoForm.get('dateOfBirth') as FormControl;
  }

  get profilePicture(): FormControl {
    return this.artistProfileForm.get('profilePicture') as FormControl;
  }
  get albums() {
    return this.albumsForm.get('albums') as FormArray;
  }

  minAgeValidator(minAge: number) {
    return (control: FormControl) => {
      const currentDate = new Date();
      const inputDate = new Date(control.value);
      const ageDiff = currentDate.getFullYear() - inputDate.getFullYear();

      if (ageDiff < minAge) {
        return {
          minAge: {
            requiredAge: minAge,
          },
        };
      }

      return null;
    };
  }

  addAlbum(): void {
    const albumGroup = this.formBuilder.group({
      picture: [''],
      date: [''],
      songs: this.formBuilder.array([]),
    });

    this.albumsForm.push(albumGroup);
  }

  removeAlbum(index: number): void {
    this.albumsForm.removeAt(index);
  }

  addSong(albumIndex: number): void {
    const songsArray = this.getAlbumSongs(albumIndex);

    const songGroup = this.formBuilder.group({
      name: [''],
      duration: [''],
    });

    songsArray.push(songGroup);
  }

  removeSong(albumIndex: number, songIndex: number): void {
    const songsArray = this.getAlbumSongs(albumIndex);
    songsArray.removeAt(songIndex);
  }

  getAlbumSongs(albumIndex: number): FormArray {
    const albumGroup = this.albumsForm.at(albumIndex) as FormGroup;
    return albumGroup.get('songs') as FormArray;
  }

  onSubmit() {
    if (this.artistForm.invalid) {
      return;
    }

    const artist: any = {
      id: null,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      dateOfBirth: this.dateOfBirth.value,
      profilePicture: this.profilePicture.value,
      stageName: this.artistProfileForm.get('stageName')?.value,
      artistBackstory: this.artistProfileForm.get('artistBackstory')?.value,
      startingDate: this.artistProfileForm.get('startingDate')?.value,
      albums: this.albumsForm.value,
    };
    this.ArtistService.createArtist(artist);
    console.log(artist);
    this.router.navigate(['/artist-search']);
  }

  selected() {
    return this.selectedFile;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    this.handleFile(file);
  }

  handleFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.handleFile(this.selectedFile);
    }
  }

  handleFile(file: File | undefined) {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.router.navigate(['../artist-search']);
  }
}
