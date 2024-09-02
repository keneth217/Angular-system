import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';



const labelClasses = "block text-sm font-medium text-muted-foreground";
const inputClasses = "mt-1 block w-full border border-border rounded-md p-2";
const buttonClasses = "px-4 py-2 rounded-md";
const cancelButtonClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/80";
const submitButtonClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
@Component({
  selector: 'app-add-creditor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-creditor.component.html',
  styleUrl: './add-creditor.component.css'
})
export class AddCreditorComponent {
  @Output() closeForm = new EventEmitter<void>();
  creditorForm: FormGroup;
  labelClasses = labelClasses;
  inputClasses = inputClasses;
  buttonClasses = buttonClasses;
  cancelButtonClasses = cancelButtonClasses;
  submitButtonClasses = submitButtonClasses;
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.creditorForm = this.fb.group({

      name: [''],
      phone: ['']
    });
  }

  onCancel() {
    this.closeForm.emit();
  }

  onSubmit() {
    if (this.creditorForm.valid) {
      const creditorData = this.creditorForm.value;
      this.db.list('creditor').push(creditorData)
        .then(() => {
          this.closeForm.emit(); // Close the form after successful submission
        })
        .catch(error => {
          console.error('Error adding creditor: ', error);
        });
    }
  }
}
