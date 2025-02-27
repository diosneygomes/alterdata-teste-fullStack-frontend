
import { Routes } from '@angular/router';
import { ClientListComponent } from '../app/components/client/client-list/client-list.component';
import { ProductListComponent } from '../app/components/product/product-list/product-list.component';
import { ClientFormComponent } from '../app/components/client/client-form/client-form.component';
import { ProductFormComponent } from '../app/components/product/product-form/product-form.component';

export const routes: Routes = [
  { path: 'clients', component: ClientListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'clients/add', component: ClientFormComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
];
