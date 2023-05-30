import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { SearchItem } from './searchitem';
import {Observable} from 'rxjs' ;
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appitunes';
  //public results: SearchItem[] = [];
  public results!: Observable<SearchItem[]>; //pour async

  //formControl
  searchField!: FormControl;
  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(mot => this.searchService.search(mot) );
    }

  constructor(public searchService: SearchService) {}

  doSearch(mot:string){
    //this.searchService.search(mot); //promise

    // this.searchService.search(mot).subscribe(   //not async
    //   (data) => {
    //   this.results = data;
    //   console.log(data);
    //   });

    this.results = this.searchService.search(mot); //avec async

  }
}
