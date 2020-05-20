import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FiltersModel} from '../models/filters.model';
import {CategoryModel} from '../models/category.model';
import {coctailsURI, filtersURI} from "../constants";

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) {
  }

  getFilters() {
    return this.http.get<FiltersModel>(`${filtersURI}?c=list`);
  }

  getCategorie(category: string){
    return this.http.get<CategoryModel>(`${coctailsURI}?c=${category}`);
  }
}
