import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyViewCreatorComponent } from './party-view-creator.component';

describe('PartyViewCreatorComponent', () => {
  let component: PartyViewCreatorComponent;
  let fixture: ComponentFixture<PartyViewCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyViewCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyViewCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
