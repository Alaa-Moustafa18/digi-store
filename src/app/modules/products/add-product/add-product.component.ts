import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/product/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {}
  addProductForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      price: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
    });
  }
  onSubmit(product: Product, formDirective: FormGroupDirective) {
    this.productService.addProduct(product);
    this.snackBar.open(this.translate.instant('NEW_ITEM_ADDED'), 'dismiss', {
      duration: 2000,
    });
    this.addProductForm.reset();
    formDirective.resetForm();
    console.log('addProductForm', this.addProductForm);
  }
}
