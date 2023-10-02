import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FebreAmarelaComponent } from './febre-amarela.component';

describe('FebreAmarelaComponent', () => {
  let component: FebreAmarelaComponent;
  let fixture: ComponentFixture<FebreAmarelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FebreAmarelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FebreAmarelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
