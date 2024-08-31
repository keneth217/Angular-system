import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


const labelClasses = "block text-sm font-medium text-muted-foreground";
const inputClasses = "mt-1 block w-full border border-border rounded-md p-2";
const buttonClasses = "px-4 py-2 rounded-md";
const cancelButtonClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/80";
const submitButtonClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
@Component({
  selector: 'app-add-store',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.css'
})
export class AddStoreComponent {
  @Output() closeForm = new EventEmitter<void>();
  storeForm: FormGroup;
  labelClasses = labelClasses;
  inputClasses = inputClasses;
  buttonClasses = buttonClasses;
  cancelButtonClasses = cancelButtonClasses;
  submitButtonClasses = submitButtonClasses;
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.storeForm = this.fb.group({
      storeNo: [''],
      storeName: [''],
      location: ['']
    });
  }

  onCancel() {
    this.closeForm.emit();
  }

  onSubmit() {
    if (this.storeForm.valid) {
      const storeData = this.storeForm.value;
      this.db.list('stores').push(storeData)
        .then(() => {
          this.closeForm.emit(); // Close the form after successful submission
        })
        .catch(error => {
          console.error('Error adding store: ', error);
        });
    }
  }
}
