import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossCircleComponent } from './cross-circle.component';

describe('CrossCircleComponent', () => {
  let component: CrossCircleComponent;
  let fixture: ComponentFixture<CrossCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
