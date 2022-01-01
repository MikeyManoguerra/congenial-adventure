import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralsPageComponent } from './murals-page.component';

describe('MuralsPageComponent', () => {
  let component: MuralsPageComponent;
  let fixture: ComponentFixture<MuralsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuralsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuralsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
