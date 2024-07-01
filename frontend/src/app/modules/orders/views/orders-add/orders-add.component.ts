import { OrdersService } from './../../services/orders.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { Client } from 'src/app/modules/clients/interfaces/clients';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetail } from '../../interfaces/orders-detail';
import { MatDialog } from '@angular/material/dialog';
import { DialogClientsAddComponent } from 'src/app/modules/clients/components/dialog-clients-add/dialog-clients-add.component';
import { DialogProductAddComponent } from 'src/app/modules/products/components/dialog-product-add/dialog-product-add.component';
import { ProductsService } from '../../../products/services/product.service';
import { Product } from 'src/app/modules/products/interfaces/products';
import { Order } from '../../interfaces/orders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss'],
})
export class OrdersAddComponent {
  addForm: FormGroup;
  clients: Client[] = [];
  products: Product[] = [];
  clientsLoading: boolean = true;
  productsLoading: boolean = true;
  dataDetails: any[] = [];

  displayedColumns: string[] = [
    'image',
    'title',
    'qty',
    'price',
    'subtotal',
    'actions',
  ];
  detail: OrderDetail[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.addForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      date: new Date(),
      total: [0],
    });
  }

  ngOnInit() {
    this.clientsLoading = true;
    this.reloadClients();
  }

  reloadClients() {
    this.clientService.fetchClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.clientsLoading = false;
      },
      error: (response: HttpErrorResponse) => {
        const message = response.error
          ? String(response.error).charAt(0).toUpperCase() +
            String(response.error).slice(1)
          : null;
        if (message) {
          this.snackBar.open(message, '', {
            duration: 1200,
          });
        }
      },
    });
  }

  reloadProducts() {
    this.productsLoading = true;
    this.productsService.fetchProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.productsLoading = false;
      },
      error: (response: HttpErrorResponse) => {
        const message = response.error
          ? String(response.error).charAt(0).toUpperCase() +
            String(response.error).slice(1)
          : null;
        if (message) {
          this.snackBar.open(message, '', {
            duration: 1200,
          });
        }
      },
    });
  }

  displayClient = (clientId: number): string => {
    if (!this.clients || !clientId) {
      return '';
    }
    const client = this.clients.find((c) => c.id === clientId);
    return client ? `${client.id} - ${client.full_name}` : '';
  };

  displayProduct = (productId: number): string => {
    if (!this.products || !productId) {
      return '';
    }
    const product = this.products.find((c) => c.id === productId);
    return product ? `${product.id} - ${product.title}` : '';
  };

  get clientId(): FormControl {
    return <FormControl<any>>this.addForm.get('clientId');
  }
  get date(): FormControl {
    return <FormControl<any>>this.addForm.get('date');
  }

  get productId(): FormControl {
    return <FormControl<any>>this.addForm.get('productId');
  }
  get total(): FormControl {
    return <FormControl<any>>this.addForm.get('total');
  }

  openAddClientDialog(): void {
    const addClientDialogRef = this.dialog.open(DialogClientsAddComponent, {});
    addClientDialogRef.afterClosed().subscribe(() => {
      this.reloadClients();
    });
  }

  deleteDetail(element: OrderDetail) {
    this.detail = this.detail.filter((e) => e !== element);
    this.detail = [...this.detail];
    const total = this.detail.reduce((acc, curr) => {
      return acc + curr.subtotal;
    }, 0);
    this.addForm.patchValue({
      total: total,
    });
  }

  openAddProductsDialog(): void {
    const addProductsDialofRef = this.dialog.open(DialogProductAddComponent, {
      width: '800px',
    });
    addProductsDialofRef.afterClosed().subscribe((data) => {
      if (data) {
        // this.detail.push({
        //   qty: data.qty,
        //   subtotal: data.qty * data.product.price,
        //   price: data.product.price,
        //   product: data.product,
        // });
        this.detail = [
          ...this.detail,
          {
            qty: data.qty,
            subtotal: data.qty * data.product.price,
            price: data.product.price,
            product: data.product,
          },
        ];

        const total = this.detail.reduce((acc, curr) => {
          return acc + curr.subtotal;
        }, 0);
        this.addForm.patchValue({
          total: total,
        });
      }

      console.log({ d: this.detail });
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      if (this.detail.length === 0) {
        this.snackBar.open('Debe agregar almenos un producto', '', {
          duration: 1200,
        });
        return;
      }

      const data: Order = {
        clientId: this.clientId?.value,
        date: this.date?.value,
        total: this.total?.value,
        detail: this.detail.map(({ product, qty, price, subtotal }) => ({
          qty,
          price,
          subtotal,
          productId: product?.id, // Asignación del productId desde el objeto 'product'
        })) as OrderDetail[],
      };

      console.log('paso aqui', data);
      this.ordersService.addOrder(data).subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },
        error: (response: HttpErrorResponse) => {
          const message = response.error
            ? String(response.error).charAt(0).toUpperCase() +
              String(response.error).slice(1)
            : null;
          if (message) {
            this.snackBar.open(message, '', {
              duration: 1200,
            });
          }
        },
      });
    }
  }
}
