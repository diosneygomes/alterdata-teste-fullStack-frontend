import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h2>Lista de Produtos</h2>
    <table mat-table [dataSource]="products" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let product"> {{product.id}} </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Nome </th>
        <td mat-cell *matCellDef="let product"> {{product.name}} </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }
}
