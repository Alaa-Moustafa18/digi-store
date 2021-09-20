import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../services/product/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productID: string = '';
  product: Product = new Product();
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productID = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.productService
      .getProductDetails(+this.productID)
      .subscribe((product) => {
        this.product = product;
      });
  }
}
