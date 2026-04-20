import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/order.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {

  orders = signal<any[]>([]);

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().then(res => {
      if (res.data.status === 200) {
        this.orders.set(res.data.data || []);
      }
    }).catch(err => {
      console.error(err);
    });
  }
}
