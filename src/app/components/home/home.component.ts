import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {
  loading = false;
  newSongs: any[] = [];
  errorMessage: string = '';

  constructor( private spotify: SpotifyService ){
    
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    await this.spotify.setToken();
    this.newSongs = await this.spotify.newReleases();
    this.loading = false;
  }

}
