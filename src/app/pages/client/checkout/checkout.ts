import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 🔥 QUAN TRỌNG
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {

  cartItems = signal<any[]>([]);

  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
  });

  form = signal({
    name: '',
    phone: '',
    email: '',
    address: '',
    payments: 'cod'
  });

  loading = signal(false);

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (!user?.id) return;

    this.cartService.getCart(user.id).then(res => {
      if (res.data.status === 200) {
        const data = res.data.data.map((item: any) => ({
          ...item,
          price: Number(item.price) // 🔥 convert tại đây
        }));

        this.cartItems.set(data);
      }
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    if (this.loading()) return;

    const user = this.authService.getUser();
    if (!user?.id) {
      this.router.navigate(['/login']);
      return;
    }

    const { name, phone, address } = this.form();

    if (!name || !phone || !address) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    this.loading.set(true);

    this.orderService.checkout({
      ...this.form(),
      user_id: user.id
    })
    .then(() => {
      alert('Đặt hàng thành công 😏');
      this.router.navigate(['/']);
    })
    .catch(err => {
      console.error(err);
      alert('Có lỗi xảy ra');
    })
    .finally(() => {
      this.loading.set(false);
    });
  }
}
