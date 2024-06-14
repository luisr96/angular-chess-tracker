import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { IProfileData } from '../shared/ProfileData';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe, SearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  currentMonth = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(
    new Date()
  );
  currentYear = new Date().getFullYear();

  searchTerm: string = 'luisr96';

  handleSearch(value: string) {
    this.searchTerm = value;
    this.getPlayerData();
    this.getPlayerStats();
  }

  testUserData$: Observable<IProfileData> =
    this.dataService.getPlayerData('luisr96');

  userData: IProfileData = {
    avatar: '',
    player_id: 0,
    '@id': '',
    url: '',
    username: '',
    followers: 0,
    country: '',
    last_online: 0,
    joined: 0,
    status: '',
    is_streamer: false,
    verified: false,
    league: '',
    streaming_platforms: [],
  };

  userStatsData = {};

  ngOnInit() {
    this.getPlayerData();
    this.getPlayerStats();
    // console.log(
    //   new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(new Date())
    // );
  }

  convertTime(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  }

  getPlayerData() {
    this.dataService.getPlayerData(this.searchTerm).subscribe(
      (data: IProfileData) => {
        console.log(data);
        this.userData = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPlayerStats() {
    this.dataService.getPlayerStats(this.searchTerm).subscribe(
      (data: any) => {
        console.log(data);
        this.userStatsData = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
