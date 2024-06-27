import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor( private giftService:GifsService ){ }

  /**
   * Que sea por ngfor, dependiendo cuantos elelemntos tenga el gifsService
   */

  get tagHistory() {
    return this.giftService.tagsHistory;
  }


}
