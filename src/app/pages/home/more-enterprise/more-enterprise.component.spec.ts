import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreEnterpriseComponent } from './more-enterprise.component';

describe('MoreEnterpriseComponent', () => {
  let component: MoreEnterpriseComponent;
  let fixture: ComponentFixture<MoreEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreEnterpriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
