import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumComponent } from './artist-album.component';

describe('ArtistAlbumComponent', () => {
  let component: ArtistAlbumComponent;
  let fixture: ComponentFixture<ArtistAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
