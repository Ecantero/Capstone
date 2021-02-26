import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResultPageComponent } from './user-result-page.component';

describe('UserResultPageComponent', () => {
  let component: UserResultPageComponent;
  let fixture: ComponentFixture<UserResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
