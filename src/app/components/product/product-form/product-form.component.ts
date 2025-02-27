import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>Adicionar Produto</h2>
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Nome" formControlName="name" required>
      </mat-form-field>
      <button mat-button type="submit" [disabled]="productForm.invalid">Salvar</button>
    </form>
  `
})
export class ProductFormComponent {
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialogRef<ProductFormComponent>);
  private fb = inject(FormBuilder);

  productForm: FormGroup = this.fb.group({
    name: ['']
  });

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
