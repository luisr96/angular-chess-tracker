import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { IProfileData } from '../shared/ProfileData';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  currentMonth = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(
    new Date()
  );
  currentYear = new Date().getFullYear();

  userSearch: FormControl = new FormControl('');
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

  ngOnInit() {
    console.log(
      new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(new Date())
    );
  }

  onSearch(event: Event) {
    event.preventDefault();

    this.dataService.getPlayerData(this.userSearch.value).subscribe(
      (data: IProfileData) => {
        console.log(data);
        this.userData = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSearchInput(event: Event) {
    this.userSearch.setValue((event.target as HTMLInputElement).value);
  }

  convertTime(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  }
}
