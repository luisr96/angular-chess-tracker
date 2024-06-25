import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data/data.service';
import { IProfileData, defaultProfileData } from '../shared/ProfileData';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { Subscription } from 'rxjs';
import { UserStatsData, defaultUserStatsData } from '../shared/UserStatsData';
import { Game } from '../shared/GamesData';
import { StatsComponent } from '../stats/stats.component';
import { SearchService } from '../search/search.service';

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
  constructor(
    private dataService: DataService,
    private searchService: SearchService
  ) {}

  private subscriptions: Subscription[] = [];

  searchTerm: string = 'luisr96';

  userData: IProfileData = defaultProfileData;
  userStatsData: UserStatsData = defaultUserStatsData;
  userGameData: Game[] = [];

  errorMessage: string | null = null;

  fetchData() {
    if (this.searchTerm.trim().length === 0) this.searchTerm = 'luisr96';
    this.getPlayerData(this.searchTerm);
    this.getPlayerStats(this.searchTerm);
    this.getLastPlayedGames(this.searchTerm);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchService.searchTerm$.subscribe((term) => {
        this.resetErrors();
        this.searchTerm = term;
        this.fetchData();
      })
    );

    this.fetchData();
  }

  getPlayerData(playerName: string) {
    this.subscriptions.push(
      this.dataService.getPlayerData(playerName).subscribe(
        (data: IProfileData) => {
          this.userData = data;
          this.resetErrors();
        },
        (err) => {
          this.errorMessage = `No account associated with ${playerName}. Try a different user.`;
        }
      )
    );
  }

  getPlayerStats(playerName: string) {
    this.subscriptions.push(
      this.dataService.getPlayerStats(playerName).subscribe(
        (data: UserStatsData) => {
          this.userStatsData = data;
          this.resetErrors();
        },
        (err) => {}
      )
    );
  }

  getLastPlayedGames(playerName: string) {
    this.subscriptions.push(
      this.dataService.getLastGamesDetails(playerName).subscribe(
        (data: Game[]) => {
          this.userGameData = data;
          this.resetErrors();
        },
        (err) => {}
      )
    );
  }

  resetErrors() {
    this.errorMessage = null;
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
