import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNotesComponent } from './table-notes.component';

describe('TableNotesComponent', () => {
  let component: TableNotesComponent;
  let fixture: ComponentFixture<TableNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
