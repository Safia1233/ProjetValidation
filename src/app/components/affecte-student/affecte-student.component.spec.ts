import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecteStudentComponent } from './affecte-student.component';

describe('AffecteStudentComponent', () => {
  let component: AffecteStudentComponent;
  let fixture: ComponentFixture<AffecteStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecteStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecteStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
