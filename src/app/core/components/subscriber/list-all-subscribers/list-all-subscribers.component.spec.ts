import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllSubscribersComponent } from './list-all-subscribers.component';

describe('ListAllSubscribersComponent', () => {
  let component: ListAllSubscribersComponent;
  let fixture: ComponentFixture<ListAllSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllSubscribersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
