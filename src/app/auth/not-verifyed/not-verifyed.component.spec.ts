import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerifyedComponent } from './not-verifyed.component';

describe('NotVerifyedComponent', () => {
  let component: NotVerifyedComponent;
  let fixture: ComponentFixture<NotVerifyedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotVerifyedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotVerifyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
