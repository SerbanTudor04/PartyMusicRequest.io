import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPartyScreenComponent } from './joinparty-screen.component';

describe('MainScreenComponent', () => {
  let component: JoinPartyScreenComponent;
  let fixture: ComponentFixture<JoinPartyScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinPartyScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPartyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
