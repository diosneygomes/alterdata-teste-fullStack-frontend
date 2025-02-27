import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/clients">Clientes</button>
      <button mat-button routerLink="/products">Produtos</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
