import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemoveComponent } from './user-remove.component';

describe('UserRemoveComponent', () => {
  let component: UserRemoveComponent;
  let fixture: ComponentFixture<UserRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
