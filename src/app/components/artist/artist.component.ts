import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent {
  loading = false;
  artist: any = {};
  topTracks: any[] = [];
  

  constructor( private activatedRoute: ActivatedRoute, 
    private spotify: SpotifyService ){

      this.activatedRoute.params.subscribe(
        params => {
          this.seeArtist( params['id'] );
          this.getTopTracks( params['id'] );

        })   
  }

  async seeArtist( id: string ) :Promise <any> {
      this.loading = true;
      this.artist = await this.spotify.getArtist( id );
      this.loading = false;
  }

  async getTopTracks( id: string ) :Promise <any> {
    this.loading = true;
    this.topTracks = await this.spotify.getTopTracks( id );
    this.loading = false;
        
  }


}
