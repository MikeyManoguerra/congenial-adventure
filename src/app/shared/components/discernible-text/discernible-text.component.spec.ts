import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscernibleTextComponent } from './discernible-text.component';

describe('DiscernibleTextComponent', () => {
  let component: DiscernibleTextComponent;
  let fixture: ComponentFixture<DiscernibleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscernibleTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscernibleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
