import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDetalharPage } from './ficha-detalhar.page';

describe('FichaDetalharPage', () => {
  let component: FichaDetalharPage;
  let fixture: ComponentFixture<FichaDetalharPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaDetalharPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaDetalharPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
