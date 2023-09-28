import { Component, Input } from '@angular/core';

//Services
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent {
  @Input () items: any[] = [];


  constructor( private router: Router ){}
  

  sendArtist( artistId: string){
    this.router.navigate(
      ['/artist', artistId]
    );
  }

  getIdArtist( item: any ){
    let artistId;

    if ( item.type == 'artist' ){
      artistId = item.id;
    } else{
      artistId = item.artists[0].id;
    }
    this.sendArtist( artistId );
  }


  

}
