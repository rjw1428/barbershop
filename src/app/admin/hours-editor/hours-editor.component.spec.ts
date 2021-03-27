import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursEditorComponent } from './hours-editor.component';

describe('HoursEditorComponent', () => {
  let component: HoursEditorComponent;
  let fixture: ComponentFixture<HoursEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
