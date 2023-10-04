import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegattaStatisticsComponent } from './regatta-statistics.component';

describe('RegattaStatisticsComponent', () => {
  let component: RegattaStatisticsComponent;
  let fixture: ComponentFixture<RegattaStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegattaStatisticsComponent]
    });
    fixture = TestBed.createComponent(RegattaStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
