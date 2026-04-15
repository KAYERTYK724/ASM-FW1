import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CloudinaryService } from './services/upload/cloud.service';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ASM-FW1');
  public notificationService = inject(NotificationService);
}
