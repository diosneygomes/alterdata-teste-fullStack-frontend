import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientService } from '../../../../services/client.service';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
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

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let client"> {{client.email}} </td>
      </ng-container>

      <ng-container matColumnDef="phoneNumber">
        <th mat-header-cell *matHeaderCellDef> Telefone </th>
        <td mat-cell *matCellDef="let client"> {{client.phoneNumber}} </td>
      </ng-container>

      <ng-container matColumnDef="active">
        <th mat-header-cell *matHeaderCellDef> Ativo </th>
        <td mat-cell *matCellDef="let client"> {{client.active ? 'Sim' : 'Não'}} </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Ações </th>
        <td mat-cell *matCellDef="let client">
          <button mat-icon-button color="primary" (click)="editClient(client)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="deleteClient(client.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  private dialog = inject(MatDialog);
  clients: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'active', 'actions'];

  constructor() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  refreshClients() {
    this.loadClients();
  }

  editClient(client: any) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '600px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshClients();
      }
    });
  }

  deleteClient(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.refreshClients();
      });
    }
  }
}
