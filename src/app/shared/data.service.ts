import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfileData } from './ProfileData';

// urls

// user data:
// https://api.chess.com/pub/player/{username}

// stats:
// https://api.chess.com/pub/player/{username}/stats

// games:
// https://api.chess.com/pub/player/{username}/games/archives

// random puzzle
// https://api.chess.com/pub/puzzle/random

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPlayerData(username: string): Observable<IProfileData> {
    const url = `https://api.chess.com/pub/player/${username}`;
    return this.http.get<IProfileData>(url);
  }

  getPlayerStats(username: string): Observable<IProfileData> {
    const url = `https://api.chess.com/pub/player/${username}/stats`;
    return this.http.get<IProfileData>(url);
  }
}
