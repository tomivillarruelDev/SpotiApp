import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{
  loading = false;
  artists: any[] = []

  constructor( private spotify: SpotifyService){}

  async ngOnInit() :Promise <any> {
    this.loading = true;
    await this.spotify.setToken();
    this.artists = await this.spotify.artists();
    this.loading = false;          
  }

  async searchArtist( value: string ) :Promise <any> {
    this.loading = true;
    this.artists = await this.spotify.searchArtist(value)
    this.loading = false
  }
}
