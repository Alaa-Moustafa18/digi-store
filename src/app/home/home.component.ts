import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartFormDialogComponent } from '../cart-form-dialog/cart-form-dialog.component';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ProductsService } from '../services/product/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  order: Order = new Order();
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      if (this.activatedRoute.snapshot.data['categoryPage']) {
        this.products = res.filter(
          (product) =>
            product.category ===
            this.activatedRoute.snapshot.paramMap.get('name')
        );
      } else {
        this.products = res;
      }
    });
  }
  openDialog(index: number) {
    const dialogRef = this.dialog.open(CartFormDialogComponent, {
      width: '30vw',
      disableClose: true,
      direction:
        localStorage.getItem('currentLanguage') == 'ar' ? 'rtl' : 'ltr',
      data: {
        product: this.products[index],
        index,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.order = res;
    });
  }
}
