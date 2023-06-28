import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInlfuencerComponent } from './more-inlfuencer.component';

describe('MoreInlfuencerComponent', () => {
  let component: MoreInlfuencerComponent;
  let fixture: ComponentFixture<MoreInlfuencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreInlfuencerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreInlfuencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
