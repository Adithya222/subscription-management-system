import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPlansComponent } from './get-all-plans.component';

describe('GetAllPlansComponent', () => {
  let component: GetAllPlansComponent;
  let fixture: ComponentFixture<GetAllPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
