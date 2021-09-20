import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { ProductsListComponent } from '../../products-list/products-list.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: '/:id', component: ProductDetailsComponent },
  { path: 'addNewProduct', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
