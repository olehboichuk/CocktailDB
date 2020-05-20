import {Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';
import {FilterModel} from '../models/filter.model';
import {CategoryModel} from '../models/category.model';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  loadingContent = false;
  filters: FilterModel[];
  categoryes: CategoryModel[] = [];

  constructor(private appServise: AppService) {
  }

  ngOnInit(): void {
    this.loadingContent = true;
    this.appServise.getFilters().subscribe(filters => {
      this.filters = filters.drinks;
      this.getAllCategoriesList();
    });
  }

  getAllCategoriesList() {
    forkJoin(
      this.filters.filter(ele => ele.chacked).map(el => {
        return this.appServise.getCategorie(el.strCategory).pipe(
          map(elem => {
            elem.category_name = el.strCategory;
            return elem;
          })
        );
      })
    ).subscribe(res => {
        this.categoryes = res;
      }, err => {
      }, () => {
        this.loadingContent = false;
      }
    );
  }

  onApplyFilter(event: any) {
    this.filters = event;
    this.categoryes = [];
    this.getAllCategoriesList();
  }
}
