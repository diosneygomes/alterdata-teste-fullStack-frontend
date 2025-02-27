import { Component, inject, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../../models/Client';


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
  templateUrl: `../client-form/client-form.component.html`
})
export class ClientFormComponent {
  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<ClientFormComponent>, { optional: true });

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public client: Client) {
  }

  clientForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
    active: [false]
  });

  ngOnInit() {
    if (this.client) {
      this.clientForm.setValue({
        name: this.client.name,
        email: this.client.email,
        phoneNumber: this.client.phoneNumber || '',
        active: this.client.active ?? true
      });
    }
  };

  onSubmit() {
    if (this.clientForm.valid) {
      if (this.client && this.client.id) {
        this.clientService.updateClient(this.client.id, this.clientForm.value).subscribe(() => {
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
