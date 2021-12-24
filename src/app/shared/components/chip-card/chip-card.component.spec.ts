import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipCardComponent } from './chip-card.component';

describe('ChipCardComponent', () => {
  let component: ChipCardComponent;
  let fixture: ComponentFixture<ChipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
