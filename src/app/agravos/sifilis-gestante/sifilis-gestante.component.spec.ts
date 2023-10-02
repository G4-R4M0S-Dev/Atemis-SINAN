import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifilisGestanteComponent } from './sifilis-gestante.component';

describe('SifilisGestanteComponent', () => {
  let component: SifilisGestanteComponent;
  let fixture: ComponentFixture<SifilisGestanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifilisGestanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SifilisGestanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
