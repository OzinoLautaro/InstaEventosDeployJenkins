import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioPublicoComponent } from './calendario-publico.component';

describe('CalendarioPublicoComponent', () => {
  let component: CalendarioPublicoComponent;
  let fixture: ComponentFixture<CalendarioPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioPublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
