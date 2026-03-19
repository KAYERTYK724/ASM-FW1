import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star',
  imports: [CommonModule],
  templateUrl: './star.html',
  styleUrl: './star.scss',
})
export class Star {
  @Input() rating: number = 0;
  
  @Output() ratingClicked = new EventEmitter<string>();

  onClick() {
    this.ratingClicked.emit(`Rating: ${this.rating}`);
  }
}
