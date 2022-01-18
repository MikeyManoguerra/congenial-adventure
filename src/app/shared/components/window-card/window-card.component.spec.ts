import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCardComponent } from './window-card.component';

describe('WindowCardComponent', () => {
  let component: WindowCardComponent;
  let fixture: ComponentFixture<WindowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
