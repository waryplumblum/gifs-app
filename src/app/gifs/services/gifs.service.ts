import { Injectable } from '@angular/core';

const GIPHY_API_KEY = '7IQjF4ILCAm67UNbH4q97qRpu1rmpk25';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagHistory: string[] = [];

  constructor() { }

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
  }

}
