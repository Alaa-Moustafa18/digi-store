import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../models/product';
import { LanguageService } from '../services/language.service';
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
    private productService: ProductsService,
    private languageService: LanguageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    // TODO: get data in resolver to make insure we have product and handle error if it is not exist.
    this.productID = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.productService
      .getProductDetails(+this.productID)
      .subscribe((product) => {
        this.product = product;
      });
    this.languageService.localeLang.subscribe((lang) => {
      this.translate.use(lang);
    });
  }
}
