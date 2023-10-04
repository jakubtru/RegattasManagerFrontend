import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegattaManagementComponent } from './regatta-management.component';

describe('RegattaManagementComponent', () => {
  let component: RegattaManagementComponent;
  let fixture: ComponentFixture<RegattaManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegattaManagementComponent]
    });
    fixture = TestBed.createComponent(RegattaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
