import { Component } from '@angular/core';
import { OrderDetail } from '../../interfaces/orders-detail';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { ProductsService } from 'src/app/modules/products/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/modules/clients/interfaces/clients';
import { Product } from 'src/app/modules/products/interfaces/products';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogClientsAddComponent } from 'src/app/modules/clients/components/dialog-clients-add/dialog-clients-add.component';
import { DialogProductAddComponent } from 'src/app/modules/products/components/dialog-product-add/dialog-product-add.component';
import { Order } from '../../interfaces/orders';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.scss'],
})
export class OrdersEditComponent {
  id: string = '';
  orderLoading: boolean = true;
  order: any = null;
  editForm: FormGroup;

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
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      date: new Date(),
      total: [0],
    });
  }

  ngOnInit() {
    this.clientsLoading = true;

    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.id = id;
      this.ordersService.fetchOrder(id).subscribe({
        next: (data: Order) => {
          if (data) {
            this.reloadClients(data.client?.id || 0);
            this.orderLoading = false;
            this.order = {
              clientId: data.client?.id,
              date: data.date,
              total: data.total,
            };
            this.detail = data.detail;
            delete this.order.id;
            this.editForm.setValue(this.order);
          } else {
            this.router.navigate(['404']);
          }
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
    });
  }

  reloadClients(clientId: Number = 0): void {
    this.clientService.fetchClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.clientsLoading = false;
        if (clientId) {
          this.editForm.patchValue({
            clientId,
          });
        }
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

  get clientId(): FormControl {
    return <FormControl<any>>this.editForm.get('clientId');
  }
  get date(): FormControl {
    return <FormControl<any>>this.editForm.get('date');
  }

  get productId(): FormControl {
    return <FormControl<any>>this.editForm.get('productId');
  }
  get total(): FormControl {
    return <FormControl<any>>this.editForm.get('total');
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
    this.editForm.patchValue({
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
        this.editForm.patchValue({
          total: total,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      if (this.detail.length === 0) {
        this.snackBar.open('Debe agregar almenos un producto', '', {
          duration: 1200,
        });
        return;
      }

      const data: any = {
        clientId: this.clientId?.value,
        total: this.total?.value,
        date: this.date?.value,
      };

      this.ordersService
        .editOrder(this.id, {
          ...data,
          detail: this.detail.map(({ product, qty, price, subtotal }) => ({
            qty,
            price,
            subtotal,
            productId: product?.id, // Asignación del productId desde el objeto 'product'
          })),
        })
        .subscribe({
          next: (data) => {
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
