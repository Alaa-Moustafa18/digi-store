import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../models/product';
import { LanguageService } from '../services/language.service';
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
    private languageService: LanguageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    //apply language
    this.languageService.localeLang.subscribe((lang) => {
      this.translate.use(lang);
    });
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
