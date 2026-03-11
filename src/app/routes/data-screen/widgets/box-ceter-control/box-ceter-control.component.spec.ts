import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCeterControlComponent } from './box-ceter-control.component';

describe('BoxCeterControlComponent', () => {
  let component: BoxCeterControlComponent;
  let fixture: ComponentFixture<BoxCeterControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxCeterControlComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BoxCeterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
