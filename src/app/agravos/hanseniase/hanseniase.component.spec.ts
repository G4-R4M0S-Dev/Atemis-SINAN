import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HanseniaseComponent } from './hanseniase.component';

describe('HanseniaseComponent', () => {
  let component: HanseniaseComponent;
  let fixture: ComponentFixture<HanseniaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HanseniaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HanseniaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
