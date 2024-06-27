import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const GIPHY_API_KEY: string = '7IQjF4ILCAm67UNbH4q97qRpu1rmpk25';
const serviceUrl:    string = 'https://api.giphy.com/v1/gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagHistory: string[] = [];

  constructor( private http:HttpClient ) { }

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory( tag:string ) {
    tag = tag.toLowerCase();

    if( this._tagHistory.includes( tag )) {
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift( tag );
    this._tagHistory = this.tagsHistory.splice(0,10);
  }

  searchTag( tag:string ):void {
    if ( tag.length ===0 ) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', 10)
      .set('q', tag)

    this.http.get(`${ serviceUrl }/search`, { params })
      .subscribe( resp => {
        console.log( resp );
      });
  }

}
