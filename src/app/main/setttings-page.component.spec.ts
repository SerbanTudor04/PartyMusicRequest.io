import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetttingsPageComponent } from './setttings-page.component';

describe('SetttingsPageComponent', () => {
  let component: SetttingsPageComponent;
  let fixture: ComponentFixture<SetttingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetttingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetttingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
