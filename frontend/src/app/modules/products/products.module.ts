import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './views/products/products.component';
import { ProductsViewComponent } from './views/products-view/products-view.component';
import { ProductsAddComponent } from './views/products-add/products-add.component';
import { ProductsEditComponent } from './views/products-edit/products-edit.component';
import { ProductsRoutingModule } from './products-routing.module';
import { DialogProductAddComponent } from './components/dialog-product-add/dialog-product-add.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsViewComponent,
    ProductsAddComponent,
    ProductsEditComponent,
    DialogProductAddComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
