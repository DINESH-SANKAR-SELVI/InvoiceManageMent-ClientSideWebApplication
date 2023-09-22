import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormatComponent } from './invoice-format.component';

describe('InvoiceFormatComponent', () => {
  let component: InvoiceFormatComponent;
  let fixture: ComponentFixture<InvoiceFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceFormatComponent]
    });
    fixture = TestBed.createComponent(InvoiceFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
