import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private clientId: string = '645983bfab5e48789fd895787bb1d833';
  private redirectUri: string = 'http://localhost:4200/callback';

  constructor(private router: Router, private httpClient: HttpClient) {}

  async redirectToAuthCodeFlow() {
    const verifier = this.generateCodeVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    this.setLocalStorageItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', this.redirectUri);
    params.append('scope', 'user-read-private user-read-email');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    const spotifyAuthorizeUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    window.location.href = spotifyAuthorizeUrl;
  }

  async getAccessToken(code: string): Promise<string> {
    const verifier = this.getLocalStorageItem('verifier');

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this.redirectUri);
    params.append('code_verifier', verifier);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const result = await this.httpClient
      .post<any>('https://accounts.spotify.com/api/token', params.toString(), {
        headers,
      })
      .toPromise();

    const { access_token } = result;
    localStorage.setItem('access_token', access_token);
    return access_token;
  }

  private generateCodeVerifier(length: number): string {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private setLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getLocalStorageItem(key: string): string {
    const item = localStorage.getItem(key);
    return item !== null ? item : '';
  }

  async fetchProfile(token: string): Promise<any> {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch profile.');
    }
  }

  async handleCallback(): Promise<void> {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error === 'access_denied') {
      console.error('Access denied');
      this.router.navigate(['/landing']);
      return;
    }

    if (!code) {
      this.redirectToAuthCodeFlow();
      throw new Error('Authorization code not found.');
    } else {
      await this.getAccessToken(code);
      this.router.navigate(['/artist-search']);
    }
  }

  async isAccessTokenValid(token: string): Promise<boolean> {
    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      await this.httpClient
        .get('https://api.spotify.com/v1/me', { headers })
        .toPromise();

      return true;
    } catch (error) {
      return false;
    }
  }

  search(keyword: string, type: string, token: string | null): Observable<any> {
    const url = `https://api.spotify.com/v1/search?q=${keyword}&type=${type}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(url, { headers });
  }

  async getArtistAlbums(
    artistId: string,
    token: string | null
  ): Promise<Album[]> {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      throw new Error('Failed to fetch artist albums.');
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/landing']);
  }
}
