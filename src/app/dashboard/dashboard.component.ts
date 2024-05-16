import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { IProfileData } from '../shared/ProfileData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPlayerData('luisr96').subscribe(
      (data: IProfileData) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
