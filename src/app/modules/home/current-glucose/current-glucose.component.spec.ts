import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGlucoseComponent } from './current-glucose.component';

describe('CurrentGlucoseComponent', () => {
  let component: CurrentGlucoseComponent;
  let fixture: ComponentFixture<CurrentGlucoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentGlucoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentGlucoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
