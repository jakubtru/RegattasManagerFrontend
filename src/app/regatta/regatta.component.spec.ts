import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegattaComponent } from './regatta.component';

describe('RegattaComponent', () => {
  let component: RegattaComponent;
  let fixture: ComponentFixture<RegattaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegattaComponent]
    });
    fixture = TestBed.createComponent(RegattaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
