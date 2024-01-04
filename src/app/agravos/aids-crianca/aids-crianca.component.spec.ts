import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AidsCriancaComponent } from './aids-crianca.component';

describe('AidsCriancaComponent', () => {
  let component: AidsCriancaComponent;
  let fixture: ComponentFixture<AidsCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidsCriancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AidsCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
