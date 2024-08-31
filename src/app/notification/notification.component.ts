import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() title: string | null = null;
  @Input() message: string | null = null;
  @Input() messageType: 'success' | 'error' | null = null;

  icon: string | null = null;

  ngOnInit(): void {
    if (this.messageType === 'success') {
      this.icon = '✔️'; // Success icon
    } else if (this.messageType === 'error') {
      this.icon = '❌'; // Error icon
    }

    if (this.message) {
      setTimeout(() => {
        this.title = null;
        this.message = null;
        this.messageType = null;
      }, 2000); // Hide message after 2 seconds
    }
  }
}
