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
  templateUrl: './app.component.html',
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
