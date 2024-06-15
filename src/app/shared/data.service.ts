import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfileData } from './ProfileData';
import { GamesData } from './GamesData';

// urls

// user data:
// https://api.chess.com/pub/player/{username}

// stats:
// https://api.chess.com/pub/player/{username}/stats

// games this month:
// https://api.chess.com/pub/player/luisr96/games/{yyyy}/{mm}

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

  getGamesThisMonth(
    username: string,
    year: string,
    month: string
  ): Observable<GamesData> {
    const url = `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;
    return this.http.get<GamesData>(url);
  }
}
