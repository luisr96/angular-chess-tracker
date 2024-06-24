import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProfileData } from '../shared/ProfileData';
import { DataService } from '../shared/data.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private dataService: DataService) {}

  @Output() search = new EventEmitter<string>();

  searchTerm: FormControl = new FormControl('');

  onSearch() {
    this.search.emit(this.searchTerm.value);
  }
}
