import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dengue2Component } from './dengue2.component';

describe('Dengue2Component', () => {
  let component: Dengue2Component;
  let fixture: ComponentFixture<Dengue2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dengue2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dengue2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
