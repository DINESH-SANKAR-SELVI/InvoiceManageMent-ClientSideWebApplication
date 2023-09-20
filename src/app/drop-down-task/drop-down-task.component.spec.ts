import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownTaskComponent } from './drop-down-task.component';

describe('DropDownTaskComponent', () => {
  let component: DropDownTaskComponent;
  let fixture: ComponentFixture<DropDownTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropDownTaskComponent]
    });
    fixture = TestBed.createComponent(DropDownTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
