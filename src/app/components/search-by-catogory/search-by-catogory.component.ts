import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search-by-catogory',
  templateUrl: './search-by-catogory.component.html',
  styleUrls: ['./search-by-catogory.component.css']
})
export class SearchByCatogoryComponent implements OnInit {

  @Input()
  categories: string[];
  searchCategory: string;

  searchText: string;
  @Output()
  onSearch = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.searchCategory = this.categories[0];
  }

  search(){
    console.log(this.searchText);
    this.onSearch.emit({category: this.searchCategory, text: this.searchText});
  }

  selectCategory(value){
    console.log(value.value);
    this.searchCategory = value.value;
  }

}
