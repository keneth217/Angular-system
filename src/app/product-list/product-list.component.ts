import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AddProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<any[]> | undefined;
  showAddProductForm = false;
  isLoading: boolean = true;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    // Set loading to true initially
    this.isLoading = true;

    // Fetch products and manage loading state
    this.products = this.db.list('products').valueChanges();
    this.products.subscribe({
      next: () => this.isLoading = false,
      error: () => this.isLoading = false
    });
  }

  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
  }
}
