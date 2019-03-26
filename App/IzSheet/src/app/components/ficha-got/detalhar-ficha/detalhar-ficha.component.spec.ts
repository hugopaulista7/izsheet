import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharFichaComponent } from './detalhar-ficha.component';

describe('DetalharFichaComponent', () => {
  let component: DetalharFichaComponent;
  let fixture: ComponentFixture<DetalharFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalharFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
