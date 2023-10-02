import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuberculoseComponent } from './tuberculose.component';

describe('TuberculoseComponent', () => {
  let component: TuberculoseComponent;
  let fixture: ComponentFixture<TuberculoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuberculoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuberculoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
