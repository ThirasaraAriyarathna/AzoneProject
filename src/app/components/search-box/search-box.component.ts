import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  searchText: string;

  @Output()
  onSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  search(){
    console.log(this.searchText);
    this.onSearch.emit(this.searchText);
  }

}
