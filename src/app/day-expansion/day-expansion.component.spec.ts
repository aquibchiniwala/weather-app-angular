import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayExpansionComponent } from './day-expansion.component';

describe('DayExpansionComponent', () => {
  let component: DayExpansionComponent;
  let fixture: ComponentFixture<DayExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayExpansionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
