import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h2>Lista de Clientes</h2>
    <table mat-table [dataSource]="clients" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let client"> {{client.id}} </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Nome </th>
        <td mat-cell *matCellDef="let client"> {{client.name}} </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  clients: any[] = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor() {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }
}
