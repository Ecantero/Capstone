import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccPageComponent } from './user-acc-page.component';

describe('UserAccPageComponent', () => {
  let component: UserAccPageComponent;
  let fixture: ComponentFixture<UserAccPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
