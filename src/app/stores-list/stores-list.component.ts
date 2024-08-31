import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AddStoreComponent } from "../add-store/add-store.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stores-list',
  standalone: true,
  imports: [AddStoreComponent, CommonModule],
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent {
  stores: Observable<any[]> | undefined;
  showAddStoreForm = false;
  loading: boolean = true;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.fetchStores();
  }

  fetchStores() {
    this.loading = true;
    this.stores = this.db.list('stores').valueChanges();
    this.stores.subscribe(() => {
      this.loading = false;
    }, () => {
      this.loading = false; // Ensure loading is stopped even if there's an error
    });
  }

  toggleAddStoreForm() {
    this.showAddStoreForm = !this.showAddStoreForm;
  }
}
