import {CategoryItemModel} from './categoryItem.model';

export interface CategoryModel {
  category_name: string;
  drinks: CategoryItemModel[];
}
