import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../interfaces/orders';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
})
export class OrdersViewComponent {
  constructor(
    private ordersService: OrdersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  orderLoading: boolean = true;
  order: any = {
    date: '',
    total: 0,
    detail: [],
  };
  moment: any = moment;
  displayedColumns: string[] = ['image', 'title', 'qty', 'price', 'subtotal'];

  ngOnInit() {
    this.orderLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.ordersService.fetchOrder(id).subscribe({
        next: (data: Order) => {
          if (data) {
            this.orderLoading = false;
            this.order = data;
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
            const message = ' Eliminado satisfactoriamente';
            this.snackBar.open(message, '', {
              duration: 1200,
            });
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
    });
  }
}
