import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  totalItemsObservable: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(
      'https://fakestoreapi.com/products?limit=10'
    );
  }

  getProductDetails(productID: number) {
    return this.http.get<Product>(
      `https://fakestoreapi.com/products/${productID}`
    );
  }
  addProduct(product: Product) {
    return this.http.post<Product>(
      `https://fakestoreapi.com/products`,
      product
    );
  }
}
