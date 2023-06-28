import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCatchuComponent } from './more-catchu.component';

describe('MoreCatchuComponent', () => {
  let component: MoreCatchuComponent;
  let fixture: ComponentFixture<MoreCatchuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreCatchuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreCatchuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
