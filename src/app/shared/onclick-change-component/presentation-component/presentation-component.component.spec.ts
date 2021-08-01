import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationComponentComponent } from './presentation-component.component';

describe('PresentationComponentComponent', () => {
  let component: PresentationComponentComponent;
  let fixture: ComponentFixture<PresentationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
