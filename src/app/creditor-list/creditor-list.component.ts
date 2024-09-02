import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AddCreditorComponent } from "../add-creditor/add-creditor.component";

@Component({
  selector: 'app-creditor-list',
  standalone: true,
  imports: [CommonModule, AddCreditorComponent],
  templateUrl: './creditor-list.component.html',
  styleUrl: './creditor-list.component.css'
})
export class CreditorListComponent {
  creditors: Observable<any[]> | undefined; // Observable to hold categories data
  showAddCategoryForm = false;
  isLoading: boolean = true;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.creditors = this.db.list('creditor').valueChanges();
    this.creditors.subscribe(() => {
      this.isLoading = false; // Set loading to false once data is fetched
    });
  }

  toggleCreditorForm() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }
}
