import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientFormComponent } from '../app/components/client/client-form/client-form.component';
import { ProductFormComponent } from '../app/components/product/product-form/product-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/clientes">Listar Clientes</button>
      <button mat-button routerLink="/clientes/novo">Cadastrar Novo Cliente</button>
      <button mat-button routerLink="/produtos">Listar Produtos</button>
      <button mat-button routerLink="/produtos/novo">Cadastrar Novo Produto</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  private dialog = inject(MatDialog);

  openClientForm(): void {
    this.dialog.open(ClientFormComponent, { width: '400px' });
  }

  openProductForm(): void {
    this.dialog.open(ProductFormComponent, { width: '400px' });
  }
}
