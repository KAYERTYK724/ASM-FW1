import { Injectable, signal } from '@angular/core';

export interface AlertMessage {
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  alert = signal<AlertMessage | null>(null);

  show(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'success') {
    this.alert.set({ message, type });
    // Tự động ẩn sau 3 giây
    setTimeout(() => this.alert.set(null), 3000);
  }
}
