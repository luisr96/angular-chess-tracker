import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { IProfileData } from './ProfileData';
import { Game, GamesData } from './GamesData';
import { GameArchiveData } from './GameArchiveData';

// urls

// user data:
// https://api.chess.com/pub/player/{username}

// stats:
// https://api.chess.com/pub/player/{username}/stats

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

  getArchivedGames(username: string): Observable<GameArchiveData> {
    const url = `https://api.chess.com/pub/player/${username}/games/archives`;
    return this.http.get<GameArchiveData>(url);
  }

  getLastGamesDetails(username: string): Observable<Game[]> {
    return this.getArchivedGames(username).pipe(
      map((data: GameArchiveData) => {
        // Get latest archive data
        const lastArchiveUrl = data.archives[data.archives.length - 1];
        return lastArchiveUrl;
      }),
      switchMap((lastArchiveUrl: string) => {
        // Make a GET request to the last archive URL
        return this.http.get<GamesData>(lastArchiveUrl);
      }),
      map((gamesData: GamesData) => {
        // Extract and sort games by end_time
        return gamesData.games.sort((a, b) => b.end_time - a.end_time);
      })
    );
  }
}
