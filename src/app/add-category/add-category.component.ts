import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

const labelClasses = "block text-sm font-medium text-muted-foreground";
const inputClasses = "mt-1 block w-full border border-border rounded-md p-2";
const buttonClasses = "px-4 py-2 rounded-md";
const cancelButtonClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/80";
const submitButtonClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80";

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'] // Note: Changed `styleUrl` to `styleUrls`
})
export class AddCategoryComponent {
  @Output() closeForm = new EventEmitter<void>();

  labelClasses = labelClasses;
  inputClasses = inputClasses;
  buttonClasses = buttonClasses;
  cancelButtonClasses = cancelButtonClasses;
  submitButtonClasses = submitButtonClasses;

  constructor(private db: AngularFireDatabase) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const categoryData = {
        name: form.value.categoryName,
        description: form.value.categoryDescription
      };

      // Add category data to Firebase Realtime Database
      this.db.list('categories').push(categoryData)
        .then(() => {
          console.log('Category added successfully');
          form.reset();
          this.closeForm.emit();
        })
        .catch(error => {
          console.error('Error adding category:', error);
        });
    }
  }

  onCancel() {
    this.closeForm.emit();
  }
}
