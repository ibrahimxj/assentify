import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSignupComponent } from './artist-signup.component';

describe('ArtistSignupComponent', () => {
  let component: ArtistSignupComponent;
  let fixture: ComponentFixture<ArtistSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
