import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftbarTagitemComponent } from './leftbar-tagitem.component';

describe('LeftbarTagitemComponent', () => {
  let component: LeftbarTagitemComponent;
  let fixture: ComponentFixture<LeftbarTagitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftbarTagitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarTagitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
