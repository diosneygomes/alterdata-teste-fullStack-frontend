import { Component, inject, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';

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
    <h2>{{ data ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Nome" formControlName="name" required>
        <mat-error *ngIf="productForm.get('name')?.invalid && productForm.get('name')?.touched">
          Nome deve ter entre 3 e 100 caracteres.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput type="number" placeholder="Preço" formControlName="price" required>
        <mat-error *ngIf="productForm.get('price')?.invalid && productForm.get('price')?.touched">
          O preço deve ser maior que 0.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput type="number" placeholder="Estoque" formControlName="stock" required>
        <mat-error *ngIf="productForm.get('stock')?.invalid && productForm.get('stock')?.touched">
          O estoque deve ser maior ou igual a 0.
        </mat-error>
      </mat-form-field>

      <button mat-button type="submit" [disabled]="productForm.invalid">Salvar</button>
    </form>
  `
})
export class ProductFormComponent {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<ProductFormComponent>, { optional: true });

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.productForm.patchValue(data || {});
  }

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    price: [null, [Validators.required, Validators.min(0.01)]],
    stock: [null, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productService.updateProduct(this.data.id, this.productForm.value).subscribe(() => {
          this.dialogRef?.close(true);
        });
      } else {
        this.productService.createProduct(this.productForm.value).subscribe(() => {
          this.dialogRef?.close(true);
          this.router.navigate(['/produtos']);
        });
      }
    }
  }
}
