import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClassComponent } from './search-class.component';

describe('SearchClassComponent', () => {
  let component: SearchClassComponent;
  let fixture: ComponentFixture<SearchClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
