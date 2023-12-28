import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPlaceTablePage } from './search-place-table.page';

describe('SearchPlaceTablePage', () => {
  let component: SearchPlaceTablePage;
  let fixture: ComponentFixture<SearchPlaceTablePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchPlaceTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
