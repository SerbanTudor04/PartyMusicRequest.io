import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshSpotifyTokenComponent } from './refresh-spotify-token.component';

describe('RefreshSpotifyTokenComponent', () => {
  let component: RefreshSpotifyTokenComponent;
  let fixture: ComponentFixture<RefreshSpotifyTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshSpotifyTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshSpotifyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
