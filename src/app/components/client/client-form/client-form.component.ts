import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-client-form',
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
    <h2>Adicionar Cliente</h2>
    <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Nome" formControlName="name" required>
      </mat-form-field>
      <button mat-button type="submit" [disabled]="clientForm.invalid">Salvar</button>
    </form>
  `
})
export class ClientFormComponent {
  private clientService = inject(ClientService);
  private dialogRef = inject(MatDialogRef<ClientFormComponent>);
  private fb = inject(FormBuilder);

  clientForm: FormGroup = this.fb.group({
    name: ['']
  });

  onSubmit() {
    if (this.clientForm.valid) {
      this.clientService.createClient(this.clientForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
