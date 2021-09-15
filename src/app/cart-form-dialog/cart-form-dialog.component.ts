import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/user';
import { ProductsService } from '../services/product/products.service';
import { UserService } from '../services/user/user.service';
import { membershipEnum } from '../shared/enums/membership.enum';

@Component({
  selector: 'app-cart-form-dialog',
  templateUrl: './cart-form-dialog.component.html',
  styleUrls: ['./cart-form-dialog.component.scss'],
})
export class CartFormDialogComponent implements OnInit {
  user: User = new User();
  discount: number = 1;
  finalPrice: number = 1;
  deduction: number = 0;
  @ViewChild('cartForm')
  cartForm!: NgForm;

  constructor(
    private dialogRef: MatDialogRef<CartFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private productService: ProductsService,
    public translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
  getPrice() {
    if (this.user?.membership == membershipEnum.Platinum) {
      this.discount = 10;
    } else if (this.user?.membership == membershipEnum.Gold) {
      this.discount = 15;
    }
    this.finalPrice =
      this.user.membership == membershipEnum.Normal
        ? this.data.product.price * this.cartForm.value.count
        : (this.data.product.price *
            this.cartForm.value.count *
            this.discount) /
          100;

    this.deduction =
      this.data.product.price * this.cartForm.value.count - this.finalPrice;
    this.productService.totalItemsObservable.next(this.cartForm.value.count);
  }

  onSubmit(cartForm: NgForm) {
    this.dialogRef.close({
      itemIndex: this.data.index,
      quantity: this.cartForm.value.count,
    });
    this.snackBar.open(this.translate.instant('NEW_ITEM_ADDED'), 'dismiss', {
      duration: 2000,
    });
  }

  //TODO: get this data from a service.
  onCloseDialog() {
    this.dialogRef.close({
      itemIndex: this.data.index,
      quantity: this.cartForm.value.count,
    });
  }
}
