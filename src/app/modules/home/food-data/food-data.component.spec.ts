import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDataComponent } from './food-data.component';

describe('FoodDataComponent', () => {
  let component: FoodDataComponent;
  let fixture: ComponentFixture<FoodDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
