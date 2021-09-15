import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  totalItemsObservable: Subject<number> = new Subject<number>();
  products: Product[] = [
    {
      name: 'laptop',
      price: 20,
      category: 'Electronics',
      quantity: 5,
    },
    {
      name: 'laptop',
      price: 20,
      category: 'home',
      quantity: 20,
    },
    {
      name: 'laptop',
      price: 20,
      category: 'toys',
      quantity: 20,
    },
    {
      name: 'laptop',
      price: 20,
      category: 'Electronics',
      quantity: 20,
    },
  ];
  constructor(private http: HttpClient) {}

  getProducts() {
    return of(this.products);
  }

  addToCart(product: Product) {
    return this.http.post<Product>('xxx', product);
  }
}
