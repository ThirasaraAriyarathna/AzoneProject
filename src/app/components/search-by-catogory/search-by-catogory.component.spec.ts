import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCatogoryComponent } from './search-by-catogory.component';

describe('SearchByCatogoryComponent', () => {
  let component: SearchByCatogoryComponent;
  let fixture: ComponentFixture<SearchByCatogoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByCatogoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCatogoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
