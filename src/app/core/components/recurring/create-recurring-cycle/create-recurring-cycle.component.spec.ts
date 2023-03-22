import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecurringCycleComponent } from './create-recurring-cycle.component';

describe('CreateRecurringCycleComponent', () => {
  let component: CreateRecurringCycleComponent;
  let fixture: ComponentFixture<CreateRecurringCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecurringCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecurringCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
