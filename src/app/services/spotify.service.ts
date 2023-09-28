import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token?: string;

  constructor(private http: HttpClient, ) { }

  async getQuery( query: string) :Promise <any> {
    const URL = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return await this.http.get( URL, { headers }).toPromise();
  }


  async setToken() : Promise <any> {
    const URL = 'https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=95ed8b94c62f45d19e4fe9fa35ab0f26&client_secret=924d3d5e766f4eaba36fda9091dfb8d8';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    try {
      const result: any = await this.http.post(URL, undefined, { headers }).toPromise();
      this.token = result.access_token;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async searchArtist( value: string ) : Promise<any> {
    try {
      const result = await this.getQuery(`search?q=${ value }&type=artist`);
      const artists =  result.artists.items;
      return artists
    } catch (error: any) {
      if (error?.status === 401) {
        await this.setToken();
        await this.searchArtist(value);
      }
    }
  }

  async artists(): Promise <any> {
    try{
      const result = await this.getQuery('browse/new-releases?country=US&limit=20');
      const artists = result.albums.items;
      return artists;
    } catch(error: any){
      if (error?.status === 401) {
        await this.setToken();
        await this.newReleases();
      }
    }

  }

  async newReleases(): Promise <any> {
    try {
      const result = await this.getQuery('browse/new-releases?country=AR&limit=20');
      const songs = result.albums.items;
      return songs;
    } catch (error: any) {
      if (error?.status === 401) {
        await this.setToken();
        await this.newReleases();
      }
    }
  }
  
  async getArtist( id: string ){
    const result = await this.getQuery(`artists/${ id }`);
    return result;
  }

  async getTopTracks( artistId: string ): Promise <any> {
    const result = await this.getQuery(`artists/${ artistId }/top-tracks?market=ar`)
    const tracks = result.tracks;
    return tracks;
  }

}