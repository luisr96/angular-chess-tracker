import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfileData } from './ProfileData';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPlayerData(username: string): Observable<IProfileData> {
    const url = `https://api.chess.com/pub/player/${username}`;
    return this.http.get<IProfileData>(url);
  }
}
