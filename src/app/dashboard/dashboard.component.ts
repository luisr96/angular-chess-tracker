import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { IProfileData, defaultProfileData } from '../shared/ProfileData';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { Observable } from 'rxjs';
import { UserStatsData, defaultUserStatsData } from '../shared/UserStatsData';
import { Game } from '../shared/GamesData';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    AsyncPipe,
    SearchComponent,
    StatsComponent,
  ],
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

  getResultText(inputPgnText: string) {
    const terminationRegex = /\[Termination\s+"([^"]+)"\]/;

    const match = inputPgnText.match(terminationRegex);

    if (match) {
      const resultText = match[1];
      return resultText;
    }

    return 'Unknown';
  }

  getOpeningUrl(inputPgnText: string) {
    const openingRegex = /\[ECOUrl\s+"([^"]+)"\]/;

    const match = inputPgnText.match(openingRegex);

    if (match) {
      const resultText = match[1];
      return resultText;
    }

    return 'Unknown';
  }

  formatOpeningUrlToWords(url: string) {
    const segment = url.split('/').pop();

    if (segment) {
      const words = segment.split('-');
      const formattedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      return formattedWords.join(' ');
    }

    return null;
  }

  convertTime(unixTime: number, time: boolean = true) {
    const date = new Date(unixTime * 1000);
    let formattedDateTime;
    if (time) {
      formattedDateTime = date.toLocaleString();
    } else {
      formattedDateTime = date.toLocaleDateString();
    }
    return formattedDateTime;
  }
}
