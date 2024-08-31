import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ProductEditComponent } from '../services/product-edit/product-edit.component';
import { ProductViewComponent } from "../services/product-view/product-view.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AddProductComponent, ProductEditComponent, ProductEditComponent, ProductViewComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<any[]> | undefined;
  showAddProductForm = false;
  showViewProduct = false;
  showEditProduct = false;
  isLoading: boolean = true;
  selectedProduct: any;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.isLoading = true;
    this.products = this.db.list('products').valueChanges();
    this.products.subscribe({
      next: () => this.isLoading = false,
      error: () => this.isLoading = false
    });
  }

  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
  }

  viewProduct(product: any) {
    this.selectedProduct = product;
    this.showViewProduct = true;
  }

  editProduct(product: any) {
    this.selectedProduct = product;
    this.showEditProduct = true;
  }

  deleteProduct(productId: string) {
    this.db.list('products').remove(productId);
  }

  updateProduct(product: any) {
    this.db.list('products').update(product.id, product);
    this.showEditProduct = false;
  }
}
