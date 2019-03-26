import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaGotComponent } from './ficha-got.component';

describe('FichaGotComponent', () => {
  let component: FichaGotComponent;
  let fixture: ComponentFixture<FichaGotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaGotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaGotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
