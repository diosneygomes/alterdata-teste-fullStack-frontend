import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientService } from '../../../services/client.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { Client } from '../../../models/Client';

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
  templateUrl: '../client-list/client-list.component.html'
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  private dialog = inject(MatDialog);
  clients: Client[] = [];
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

  editClient(client: Client) {
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
