import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/product/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
