import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../category.service';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category!: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    productService
      .getAll()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((params: ParamMap) => {
        this.category = params.get('category')!;

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    this.categories$ = categoryService.getAll();
  }
}
