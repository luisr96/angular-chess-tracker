import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { IProfileData, defaultProfileData } from '../shared/ProfileData';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { Observable } from 'rxjs';
import { UserStatsData, defaultUserStatsData } from '../shared/UserStatsData';
import { Game } from '../shared/GamesData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe, SearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  searchTerm: string = 'luisr96';

  handleSearch(value: string) {
    this.searchTerm = value;
    this.fetchData();
  }

  // testUserData$: Observable<IProfileData> =
  //   this.dataService.getPlayerData('luisr96');

  userData: IProfileData = defaultProfileData;
  userStatsData: UserStatsData = defaultUserStatsData;
  userGameData: Game[] = [];

  fetchData() {
    this.getPlayerData(this.searchTerm);
    this.getPlayerStats(this.searchTerm);
    this.getLastPlayedGames(this.searchTerm);
  }

  ngOnInit() {
    this.fetchData();
  }

  getPlayerData(playerName: string) {
    this.dataService.getPlayerData(playerName).subscribe(
      (data: IProfileData) => {
        this.userData = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPlayerStats(playerName: string) {
    this.dataService.getPlayerStats(playerName).subscribe(
      (data: any) => {
        this.userStatsData = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getLastPlayedGames(playerName: string) {
    this.dataService.getLastGamesDetails(playerName).subscribe(
      (data: any) => {
        this.userGameData = data;
        console.log(this.userGameData);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  convertTime(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  }
}
