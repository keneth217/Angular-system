import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component'; // Adjust import based on your project structure
// Adjust import based on your project structure
import { ProductsService } from '../services/products.service';
import { Supplier } from '../models/supplier.model';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, AddSupplierComponent],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent {
  showAddSupplierForm = false;
  isLoading = true;
  suppliers: Observable<Supplier[]> | undefined;

  constructor(private supplierService: ProductsService) {
    this.loadSuppliers();
  }
  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.suppliers = this.supplierService.getSuppliers();
    this.suppliers.subscribe(() => {
      this.isLoading = false;
    });
  }

  toggleAddSupplierForm() {
    this.showAddSupplierForm = !this.showAddSupplierForm;
  }

  deleteSupplier(supplierId: string) {
    // Implement deletion logic here
    // this.supplierService.deleteSupplier(supplierId).subscribe(() => {
    //   this.loadSuppliers(); // Reload suppliers after deletion
    // });
  }

  editSupplier(supplier: Supplier) {
    // Implement edit logic here
  }

  viewSupplier(supplier: Supplier) {
    // Implement view logic here
  }
}
