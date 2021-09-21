import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from '../../products-list/products-list.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProductsListComponent,
    AddProductComponent,
    ProductDetailsComponent,
  ],
  exports: [
    ProductsListComponent,
    AddProductComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    MaterialModule,

    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: productHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule {}
export function productHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
