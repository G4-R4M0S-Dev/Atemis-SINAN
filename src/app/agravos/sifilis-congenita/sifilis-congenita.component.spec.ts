import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifilisCongenitaComponent } from './sifilis-congenita.component';

describe('SifilisCongenitaComponent', () => {
  let component: SifilisCongenitaComponent;
  let fixture: ComponentFixture<SifilisCongenitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifilisCongenitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SifilisCongenitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
