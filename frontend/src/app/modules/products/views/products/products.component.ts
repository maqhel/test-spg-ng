import { Component } from '@angular/core';
import { Product } from '../../interfaces/products';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  displayedColumns: string[] = ['image', 'title', 'price', 'actions'];
  filterForm: FormGroup;
  productsLoading: boolean = true;
  products: any[] = [];

  constructor(
    private productsService: ProductsService,
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
    this.reloadProducts();
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

  openDeleteDialog(id: number, message: string) {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        message,
      },
    });
    deleteDialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.productsService.removeProduct(id).subscribe({
          next: () => {
            const message = 'Eliminado satisfactoriamente';
            this.snackBar.open(message, '', {
              duration: 1200,
            });
            this.reloadProducts();
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

  get filteredProducts(): any[] {
    let products: Product[] = this.products;
    if (this.title?.value) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(this.title?.value.toLowerCase())
      );
    }

    return products;
  }
}
