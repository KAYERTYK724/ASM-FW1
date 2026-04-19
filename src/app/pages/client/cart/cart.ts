import { Component, OnInit, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  cartItems = signal<any[]>([]);
  loading = signal(true);

  // ✅ Tính tổng tiền tự động
  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  });

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router, // ✅ Dùng Router thay window
    @Inject(PLATFORM_ID) private platformId: Object // ✅ Check platform
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const user = this.authService.getUser();
    if (!user?.id) {
      // ✅ Không dùng window nữa
      if (this.isBrowser()) {
        this.router.navigate(['/login']);
      }
      return;
    }

    this.loading.set(true);
    this.cartService.getCart(user.id).then(res => {
      if (res.data.status === 200) {
        this.cartItems.set(res.data.data);
      }
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      this.loading.set(false);
    });
  }

  updateQuantity(item: any, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(item.id);
      return;
    }
    this.cartService.update(item.id, quantity).then(() => {
      this.loadCart(); // load lại
    });
  }

   removeItem(id: number) {
    // ✅ Không dùng confirm trên SSR, check isBrowser trước
    if (!this.isBrowser()) return;
    if (!confirm('Xóa sản phẩm này?')) return;

    this.cartService.remove(id).then(() => {
      this.loadCart();
    });
  }
}
