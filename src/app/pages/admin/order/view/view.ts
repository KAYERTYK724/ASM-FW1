import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View implements OnInit {
  order = signal<any>(null);
  selectedStatus = signal<string>('pending');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!id) {
        console.error('Không có ID');
        return;
      }

      this.loadOrder(id);
    });
  }

  async loadOrder(id: number) {
    try {
      const res = await this.orderService.getById(id);
      const data = res.data.data;

      this.order.set(data);
      this.selectedStatus.set(data.order_status);
    } catch (error) {
      console.error('Lỗi load order:', error);
    }
  }

  async updateStatus() {
    const current = this.order();
    if (!current) return;

    const status = this.selectedStatus();

    try {
      await this.orderService.updateStatus(current.id, status);

      this.order.update((o) => ({
        ...o,
        order_status: status,
        payment_status: status === 'completed' ? 'paid' : 'pending',
      }));

      alert('Cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi update:', error);
    }
  }

  getStatusText(status: string) {
    const map: any = {
      pending: 'Chờ xác nhận',
      shipping: 'Đang giao hàng',
      completed: 'Đã giao thành công',
      cancelled: 'Đã hủy',
    };
    return map[status] || status;
  }

  getPaymentText(status: string) {
    return status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán';
  }
  getTotal() {
    const items = this.order()?.orderDetails || [];

    return items.reduce((sum: number, item: any) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  }
}
