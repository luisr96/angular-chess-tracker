import { Component, Input } from '@angular/core';
import { UserStatsData } from '../shared/UserStatsData';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  @Input() userStatsData!: UserStatsData;
}
