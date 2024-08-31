import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/products.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  closeView() {
    this.close.emit();
  }
}
