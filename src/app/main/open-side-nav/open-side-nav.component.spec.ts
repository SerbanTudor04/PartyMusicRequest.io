import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSideNavComponent } from './open-side-nav.component';

describe('OpenSideNavComponent', () => {
  let component: OpenSideNavComponent;
  let fixture: ComponentFixture<OpenSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
