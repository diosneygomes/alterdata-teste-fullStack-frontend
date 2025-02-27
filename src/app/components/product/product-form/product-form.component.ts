import { Component, inject, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/Product';

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
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<ProductFormComponent>, { optional: true });

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public product: Product) {
    this.productForm.patchValue(product || {});
  }

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    price: [null, [Validators.required, Validators.min(0.01)]],
    stock: [null, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.productForm.valid) {
      if (this.product && this.product.id) {
        this.productService.updateProduct(this.product.id, this.productForm.value).subscribe(() => {
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
