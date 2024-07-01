import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../../interfaces/orders';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import * as moment from 'moment';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  displayedColumns: string[] = ['date', 'full_name', 'total', 'actions'];
  filterForm: FormGroup;
  ordersLoading: boolean = true;
  orders: Order[] = [];
  moment: any = moment;

  constructor(
    private ordersService: OrdersService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.formBuilder.group({
      title: [''],
    });
  }

  get title(): FormControl {
    return <FormControl<any>>this.filterForm.get('title');
  }

  ngOnInit() {
    this.reloadOrders();
  }

  reloadOrders() {
    this.ordersLoading = true;
    this.ordersService.fetchOrders().subscribe({
      next: (data: Order[]) => {
        console.log({ data });
        this.orders = data;
        this.ordersLoading = false;
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

  openDeleteDialog(id: number, message: string) {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        message,
      },
    });
    deleteDialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.ordersService.removeOrder(id).subscribe({
          next: () => {
            const message = 'Eliminado satisfactoriamente';
            this.snackBar.open(message, '', {
              duration: 1200,
            });
            this.reloadOrders();
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
    });
  }

  get filteredOrders(): Order[] {
    let orders: Order[] = this.orders;
    if (this.title?.value) {
      orders = orders.filter((p) =>
        p.client?.full_name
          .toLowerCase()
          .includes(this.title?.value.toLowerCase())
      );
    }

    return orders;
  }
}
