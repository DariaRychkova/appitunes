import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs' ;
import 'rxjs/add/operator/map';
import { SearchItem } from './searchitem';


  @Injectable({
    providedIn: 'root'
  })

export class SearchService {

 apiRoot: string = 'https://itunes.apple.com/search';
 resultats: any | any[];
 loading: boolean;
 
  constructor(private http:HttpClient) {
    this.resultats= [];
    this.loading = false;
   }
/*VERSION PROMISE*/ 
  //  search(mot: string){
  //   let promise = new Promise<void>((resolve,reject) =>
  //   {
  //     let apiUrl = this.apiRoot + '?term= '+ mot + ' &media=music&limit=20';
  //     this.http.get(apiUrl).toPromise().then((res) => 
  //     {
  //      this.resultats = JSON.stringify(res);
  //      let test = JSON.parse(this.resultats);
  //      this.resultats = test.results;
  //      resolve();
  //    // console.log(this.resultats);
  //     // if (this.resultats.includes(mot) {

  //     // // }
  //     // for (let i = 0; i < 20; i++) {
  //     // // console.log(this.resultats[i]['artistName']);
  //     //  this.nomArtiste = this.resultats[i]['artistName'];
  //     // console.log(this.resultats);
       
  //    // }

  //     })
  //     //this.resultats = res.getResults()
  //     console.log(this.resultats);
  //   })
  //   return promise;
  //   }

/*VERSION OBSERVABLE*/ 

search(mot: string): Observable<SearchItem[]> {
  var apiUrl = this.apiRoot + '?term= '+ mot + ' &media=music&limit=20';
   return this.http.get(apiUrl)
    .map(
      (res: any) => {
    this.resultats = JSON.stringify(res);
    let test = JSON.parse( this.resultats);
    this.resultats = test.results.map(
      (           item: { trackName: string; artistName: string; trackViewUrl: string; artworkUrl30: string; artistId: string; }) => {
        return new SearchItem(
          item.trackName,
          item.artistName,
          item.trackViewUrl,
          item.artworkUrl30,
          item.artistId
        )
      }
    );
    return this.resultats;
    });
}

}
