import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY: string = '7IQjF4ILCAm67UNbH4q97qRpu1rmpk25';
const serviceUrl:    string = 'https://api.giphy.com/v1/gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagHistory: string[] = [];
  public  gifList:     Gif   [] = [];

  constructor( private http:HttpClient ) {
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  }

  private loadLocalStorage():void{
    if( !localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse( localStorage.getItem('history')! );
    if( this._tagHistory.length === 0) return;
    this.searchTag( this._tagHistory[0]);
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify( this._tagHistory ));
  }

  searchTag( tag:string ):void {
    if ( tag.length ===0 ) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${ serviceUrl }/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
        // console.log({ gifs: this.gifList});
      });
  }

}


