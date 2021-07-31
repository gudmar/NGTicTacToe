import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnclickChangeComponentComponent } from './onclick-change-component.component';

describe('OnclickChangeComponentComponent', () => {
  let component: OnclickChangeComponentComponent;
  let fixture: ComponentFixture<OnclickChangeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnclickChangeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnclickChangeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
