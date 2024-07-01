import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { SelectComponent } from './components/select/select.component';
import { InputComponent } from './components/input/input.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    SelectComponent,
    InputComponent,
    FormGroupComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    SelectComponent,
    InputComponent,
    FormGroupComponent,
    DeleteDialogComponent,
  ],
})
export class SharedModule {}
