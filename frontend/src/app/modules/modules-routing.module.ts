import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/views/dashboard/dashboard.component';
import { ProductsComponent } from './products/views/products/products.component';
import { ProductsAddComponent } from './products/views/products-add/products-add.component';
import { ProductsViewComponent } from './products/views/products-view/products-view.component';
import { ProductsEditComponent } from './products/views/products-edit/products-edit.component';
import { OrdersComponent } from './orders/views/orders/orders.component';
import { OrdersAddComponent } from './orders/views/orders-add/orders-add.component';
import { OrdersViewComponent } from './orders/views/orders-view/orders-view.component';
import { OrdersEditComponent } from './orders/views/orders-edit/orders-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/add',
    component: OrdersAddComponent,
  },
  {
    path: 'orders/:id',
    component: OrdersViewComponent,
  },
  {
    path: 'orders/edit/:id',
    component: OrdersEditComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/add',
    component: ProductsAddComponent,
  },
  {
    path: 'products/:id',
    component: ProductsViewComponent,
  },
  {
    path: 'products/edit/:id',
    component: ProductsEditComponent,
  },

  // {
  //   path: '',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'products',
  //   component: ProductsComponent,
  // },
  // {
  //   path: 'products/add',
  //   component: ProductsAddComponent,
  // },
  // {
  //   path: 'products/:id',
  //   component: ProductsViewComponent,
  // },
  // {
  //   path: 'products/edit/:id',
  //   component: ProductsEditComponent,
  // },
  // {
  //   path: 'categories',
  //   component: CategoriesComponent,
  // },
  // {
  //   path: 'categories/:name',
  //   component: CategoriesViewComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
