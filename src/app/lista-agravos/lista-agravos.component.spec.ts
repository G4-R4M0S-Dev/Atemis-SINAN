import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgravosComponent } from './lista-agravos.component';

describe('ListaAgravosComponent', () => {
  let component: ListaAgravosComponent;
  let fixture: ComponentFixture<ListaAgravosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAgravosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAgravosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
