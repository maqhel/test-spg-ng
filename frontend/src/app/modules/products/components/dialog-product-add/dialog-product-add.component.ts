import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogClientsAddComponent } from 'src/app/modules/clients/components/dialog-clients-add/dialog-clients-add.component';
import { Product } from '../../interfaces/products';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-dialog-product-add',
  templateUrl: './dialog-product-add.component.html',
  styleUrls: ['./dialog-product-add.component.scss'],
})
export class DialogProductAddComponent {
  addForm: FormGroup;
  products: Product[] = [];
  productsLoading: boolean = true;

  displayedColumns: string[] = [
    'image',
    'title',
    'qty',
    'price',
    'subtotal',
    'actions',
  ];
  // detail: OrderDetail[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<DialogClientsAddComponent>
  ) {
    this.addForm = this.formBuilder.group({
      product: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.reloadProducts();
  }
  get product(): FormControl {
    return <FormControl<any>>this.addForm.get('product');
  }

  get qty(): FormControl {
    return <FormControl<any>>this.addForm.get('qty');
  }

  displayProduct = (productId: any): string => {
    if (!this.products || !productId) {
      return '';
    }
    const product = this.products.find((c) => c.id === productId?.id);
    return product ? `${product.id} - ${product.title}` : '';
  };

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

  onSubmit(): void {
    if (this.addForm.valid) {
      this.dialogRef.close({
        product: this.product?.value,
        qty: this.qty?.value,
      });
    }
    //   const data  = {
    //     product: this.product?.value
    //     qty: this.qty?.value,
    //   };
    //   this.clientsService.addClient(data).subscribe({
    //     next: () => {
    //       this.dialogRef.close();
    //     },
    //     error: (response: HttpErrorResponse) => {
    //       const message = response.error
    //         ? String(response.error).charAt(0).toUpperCase() +
    //           String(response.error).slice(1)
    //         : null;
    //       if (message) {
    //         this.snackBar.open(message, '', {
    //           duration: 1200,
    //         });
    //       }
    //     },
    //   });
    // }
  }
}
