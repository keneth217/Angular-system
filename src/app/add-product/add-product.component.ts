import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from "../notification/notification.component";

const labelClasses = "block text-sm font-medium text-muted-foreground";
const inputClasses = "mt-1 block w-full border border-border rounded-md p-2";
const buttonClasses = "px-4 py-2 rounded-md";
const cancelButtonClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/80";
const submitButtonClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NotificationComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @Output() closeForm = new EventEmitter<void>();

  labelClasses = labelClasses;
  inputClasses = inputClasses;
  buttonClasses = buttonClasses;
  cancelButtonClasses = cancelButtonClasses;
  submitButtonClasses = submitButtonClasses;


  productData: any = {};
  imagePreviewUrl: string | ArrayBuffer | null = null;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  title: string | null = null;

  constructor(private productService: ProductsService,
     private data: AngularFireStorage,
      private db: AngularFireDatabase) {}

  onSubmit(form: any) {
    if (!this.productData.imageUrl) {
      console.error('Image URL is missing!');
      return;
    }

    const productData = {
      batch: form.value.productBatch,
      name: form.value.productName,
      description: form.value.productDescription,
      costPrice: form.value.costPrice,
      sellingPrice: form.value.sellingPrice,
      quantity: form.value.qty,
      supplier: form.value.supplier,
      category: form.value.category,
      warehouse: form.value.warehouse,
      expiryDate: form.value.expiryDate,
      imageUrl: this.productData.imageUrl,
    };
    this.productService.addProduct(productData)
    .then(() => {
      this.setMessage('Product added successfully!', 'success', 'Success');
      form.reset();
      this.imagePreviewUrl = null;
      this.closeForm.emit();
    })
    .catch((error: any) => {
      this.setMessage('Error adding product: ' + error.message, 'error', 'Error');
    });
}

setMessage(message: string, type: 'success' | 'error', title: string) {
  this.message = message;
  this.messageType = type;
  this.title = title;
  setTimeout(() => {
    this.message = null;
    this.messageType = null;
    this.title = null;
  }, 2000);
}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreviewUrl = reader.result;
    };

    reader.readAsDataURL(file);

    const filePath = `products/${file.name}`;
    const fileRef = this.data.ref(filePath);
    const uploadTask = this.data.upload(filePath, file);

    uploadTask.snapshotChanges().toPromise().then(() => {
      fileRef.getDownloadURL().toPromise().then((url: any) => {
        this.productData.imageUrl = url;
        console.log('Image uploaded and URL retrieved:', url);
      }).catch((error: any) => console.error('Error getting download URL: ', error));
    }).catch((error: any) => console.error('Error uploading image: ', error));
  }

  onCancel() {
    this.closeForm.emit();
  }
}
