import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidProductListComponent } from './valid-product-list.component';

describe('ValidProductListComponent', () => {
  let component: ValidProductListComponent;
  let fixture: ComponentFixture<ValidProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
