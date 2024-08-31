import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { ProductListComponent } from './product-list/product-list.component';


const shadowClasses = 'shadow-lg';
const bgClasses = 'bg-accent';
const textClasses = 'text-white';
const hoverClasses = 'hover:bg-secondary/80 transition';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterModule, CommonModule, DashboardComponentComponent, ProductListComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'point-of-sale';

  shadowClasses = shadowClasses;
  bgClasses = bgClasses;
  textClasses = textClasses;
  hoverClasses = hoverClasses;
}
