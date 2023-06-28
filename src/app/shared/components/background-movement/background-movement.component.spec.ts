import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundMovementComponent } from './background-movement.component';

describe('BackgroundMovementComponent', () => {
  let component: BackgroundMovementComponent;
  let fixture: ComponentFixture<BackgroundMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
