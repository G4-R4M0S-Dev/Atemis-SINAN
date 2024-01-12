import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolenciaInterpessoalComponent } from './violencia-interpessoal.component';

describe('ViolenciaInterpessoalComponent', () => {
  let component: ViolenciaInterpessoalComponent;
  let fixture: ComponentFixture<ViolenciaInterpessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViolenciaInterpessoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViolenciaInterpessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
