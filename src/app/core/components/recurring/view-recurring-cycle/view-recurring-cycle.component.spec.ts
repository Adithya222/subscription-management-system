import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecurringCycleComponent } from './view-recurring-cycle.component';

describe('ViewRecurringCycleComponent', () => {
  let component: ViewRecurringCycleComponent;
  let fixture: ComponentFixture<ViewRecurringCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecurringCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecurringCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
