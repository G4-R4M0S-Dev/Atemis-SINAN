import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaivaHumanaComponent } from './raiva-humana.component';

describe('RaivaHumanaComponent', () => {
  let component: RaivaHumanaComponent;
  let fixture: ComponentFixture<RaivaHumanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaivaHumanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaivaHumanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
