import { Component, inject, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientService } from '../../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  template: `
    <h2>{{ data ? 'Editar Cliente' : 'Adicionar Cliente' }}</h2>
    <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Nome" formControlName="name" required>
        <mat-error *ngIf="clientForm.get('name')?.invalid && clientForm.get('name')?.touched">
          Nome deve ter entre 3 e 100 caracteres.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput type="email" placeholder="Email" formControlName="email" required>
        <mat-error *ngIf="clientForm.get('email')?.invalid && clientForm.get('email')?.touched">
          Insira um e-mail válido.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Telefone" formControlName="phoneNumber">
        <mat-error *ngIf="clientForm.get('phoneNumber')?.invalid && clientForm.get('phoneNumber')?.touched">
          O telefone deve estar no formato (XX) XXXXX-XXXX.
        </mat-error>
      </mat-form-field>

      <mat-checkbox formControlName="active">Ativo</mat-checkbox>

      <button mat-button type="submit" [disabled]="clientForm.invalid">Salvar</button>
    </form>
  `
})
export class ClientFormComponent {
  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<ClientFormComponent>, { optional: true });

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.clientForm.patchValue(data || {});
  }

  clientForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
    active: [false]
  });

  onSubmit() {
    if (this.clientForm.valid) {
      if (this.data) {
        this.clientService.updateClient(this.data.id, this.clientForm.value).subscribe(() => {
          this.dialogRef?.close(true);
        });
      } else {
        this.clientService.createClient(this.clientForm.value).subscribe(() => {
          this.dialogRef?.close(true);
          this.router.navigate(['/clientes']);
        });
      }
    }
  }
}
