import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCountComponent } from './library-count.component';

describe('LibraryCountComponent', () => {
  let component: LibraryCountComponent;
  let fixture: ComponentFixture<LibraryCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
