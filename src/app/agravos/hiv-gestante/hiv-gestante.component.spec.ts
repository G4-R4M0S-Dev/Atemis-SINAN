import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivGestanteComponent } from './hiv-gestante.component';

describe('HivGestanteComponent', () => {
  let component: HivGestanteComponent;
  let fixture: ComponentFixture<HivGestanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivGestanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HivGestanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
