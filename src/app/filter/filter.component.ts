import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppService} from '../services/app.service';
import {FilterModel} from '../models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filters: FilterModel[];
  @Output() readonly filtersToContent = new EventEmitter<FilterModel[]>();
  isActive = false;

  constructor(private appServise: AppService) {
  }

  ngOnInit(): void {
    this.appServise.getFilters().subscribe(filters => {
      this.filters = filters.drinks;
      this.filters.forEach(filter => filter.chacked = true);
      this.filtersToContent.emit(this.filters);
    });
  }

  onClick() {
    this.filtersToContent.emit(this.filters);
  }

  onChanged(filter: FilterModel) {
    const index = this.filters.indexOf(filter);
    this.filters[index].chacked ? this.filters[index].chacked = false : this.filters[index].chacked = true;
  }

  hamburger() {
    this.isActive ? this.isActive = false : this.isActive = true;
  }
}
