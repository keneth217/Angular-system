import { Routes } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { StoresListComponent } from './stores-list/stores-list.component';
import { CreditorListComponent } from './creditor-list/creditor-list.component';

export const routes: Routes = [
  { path: "", redirectTo: "dash", pathMatch: "full" },
  {
      path:"dash", component:DashboardComponentComponent, title:"Admin Dashboard" },
  { path: "products",component:ProductListComponent },
  { path:"category",component:CategoryListComponent },
  { path:"user",component:UsersListComponent },
  { path:"store",component:StoresListComponent },
  { path:"supplier",component:SupplierListComponent },
  { path:"creditor",component:CreditorListComponent },
];
