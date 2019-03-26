import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaFichasPage } from './sistema-fichas.page';

describe('SistemaFichasPage', () => {
  let component: SistemaFichasPage;
  let fixture: ComponentFixture<SistemaFichasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaFichasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaFichasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
