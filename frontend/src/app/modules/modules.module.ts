import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/views/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/views/products/products.component';
import { ProductsAddComponent } from './products/views/products-add/products-add.component';
import { ProductsViewComponent } from './products/views/products-view/products-view.component';
import { ProductsEditComponent } from './products/views/products-edit/products-edit.component';
import { OrdersComponent } from './orders/views/orders/orders.component';
import { OrdersAddComponent } from './orders/views/orders-add/orders-add.component';
import { DialogClientsAddComponent } from './clients/components/dialog-clients-add/dialog-clients-add.component';
import { DialogProductAddComponent } from './products/components/dialog-product-add/dialog-product-add.component';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrdersViewComponent } from './orders/views/orders-view/orders-view.component';
import { OrdersEditComponent } from './orders/views/orders-edit/orders-edit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    ProductsAddComponent,
    ProductsViewComponent,
    ProductsEditComponent,
    OrdersComponent,
    OrdersAddComponent,
    DialogClientsAddComponent,
    DialogProductAddComponent,
    OrdersViewComponent,
    OrdersEditComponent,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class ModulesModule {}
