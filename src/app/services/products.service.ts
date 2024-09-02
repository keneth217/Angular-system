import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from '../models/products.model';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productCollectionName = 'products';
  private supplierCollectionName = 'suppliers';
  private creditorCollectionName = 'creditors';

  constructor(private db: AngularFireDatabase) {}

  // Add product to Realtime Database
  addProduct(product: Product): Promise<void> {
    const productRef = this.db.list(this.productCollectionName);
    return productRef.push(product).then(() => {
      console.log('Product added to Realtime Database');
    });
  }
  addSupplier(product: Supplier): Promise<void> {
    const productRef = this.db.list(this.supplierCollectionName);
    return productRef.push(product).then(() => {
      console.log('Product added to Realtime Database');
    });
  }
  addCreditor(product: Product): Promise<void> {
    const productRef = this.db.list(this.creditorCollectionName);
    return productRef.push(product).then(() => {
      console.log('Product added to Realtime Database');
    });
  }

  // Fetch all suppliers from Realtime Database
  getSuppliers(): Observable<any[]> {
    return this.db.list('suppliers').valueChanges();
  }

  // Fetch all categories from Realtime Database
  getCategories(): Observable<any[]> {
    return this.db.list('categories').valueChanges();
  }

  // Fetch all warehouses from Realtime Database
  getWarehouses(): Observable<any[]> {
    return this.db.list('warehouses').valueChanges();
  }
}
