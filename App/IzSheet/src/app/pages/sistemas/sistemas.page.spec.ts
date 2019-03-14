import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasPage } from './sistemas.page';

describe('SistemasPage', () => {
  let component: SistemasPage;
  let fixture: ComponentFixture<SistemasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
