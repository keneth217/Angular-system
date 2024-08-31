import { Component } from '@angular/core';
import { CardComponentComponent } from "../card-component/card-component.component";

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CardComponentComponent],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css'
})
export class DashboardComponentComponent {

}
