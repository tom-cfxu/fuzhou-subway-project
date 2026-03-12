import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyiduComponent } from './manyidu.component';

describe('ManyiduComponent', () => {
  let component: ManyiduComponent;
  let fixture: ComponentFixture<ManyiduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManyiduComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ManyiduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
