import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from '../models/products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private collectionName = 'products';

  constructor(private db: AngularFireDatabase) { }

  // Add product to Realtime Database
  addProduct(product: Product): Promise<void> {
    const productRef = this.db.list(this.collectionName);
    return productRef.push(product).then(() => {
      console.log('Product added to Realtime Database');
    });
  }
}
