import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/products.model';
 // Adjust import based on your project structure

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      costPrice: [''],
      sellingPrice: [''],
      qty: [''],
      supplier: [''],
      category: [''],
      warehouse: [''],
      expiryDate: [''],
      imageUrl: ['']
    });
  }

  ngOnChanges() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  saveProduct() {
    this.save.emit(this.productForm.value);
  }

  closeEdit() {
    this.close.emit();
  }
}
