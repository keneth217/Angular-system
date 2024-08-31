import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AddCategoryComponent } from "../add-category/add-category.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [AddCategoryComponent,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: Observable<any[]> | undefined; // Observable to hold categories data
  showAddCategoryForm = false;
  isLoading: boolean = true;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.categories = this.db.list('categories').valueChanges();
    this.categories.subscribe(() => {
      this.isLoading = false; // Set loading to false once data is fetched
    });
  }

  toggleCategoryForm() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }
}
