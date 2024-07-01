import { Component, Inject } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../../interfaces/clients';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-clients-add',
  templateUrl: './dialog-clients-add.component.html',
  styleUrls: ['./dialog-clients-add.component.scss'],
})
export class DialogClientsAddComponent {
  addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogClientsAddComponent>
  ) {
    this.addForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      last_name: [''],
      phone: [''],
      email: ['', Validators.email],
    });
  }

  ngOnInit() {}

  get full_name(): FormControl {
    return <FormControl<any>>this.addForm.get('full_name');
  }

  get last_name(): FormControl {
    return <FormControl<any>>this.addForm.get('last_name');
  }

  get phone(): FormControl {
    return <FormControl<any>>this.addForm.get('phone');
  }

  get email(): FormControl {
    return <FormControl<any>>this.addForm.get('email');
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const data: Client = {
        full_name: this.full_name?.value,
        last_name: this.last_name?.value,
        phone: this.phone?.value,
        email: this.email?.value,
      };
      this.clientsService.addClient(data).subscribe({
        next: () => {
          this.dialogRef.close();
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
