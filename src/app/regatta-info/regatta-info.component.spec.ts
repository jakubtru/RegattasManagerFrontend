import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegattaInfoComponent } from './regatta-info.component';

describe('RegattaInfoComponent', () => {
  let component: RegattaInfoComponent;
  let fixture: ComponentFixture<RegattaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegattaInfoComponent]
    });
    fixture = TestBed.createComponent(RegattaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
