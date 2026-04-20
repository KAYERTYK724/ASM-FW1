import { Component, OnInit, signal } from '@angular/core';
import { IProduct } from '../../../interfaces/product.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-detail-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.scss',
})
export class DetailProduct implements OnInit {
  product = signal<IProduct | null>(null);

  dataListProduct = signal<IProduct[]>([]);

  // THÊM
  comments = signal<any[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    // private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.fetchData(id); // ✅ bỏ await
    });
  }

  fetchData(id: number) {
    Promise.all([this.productService.getById(id), this.productService.list()])
      .then(([detail, list]) => {
        if (detail.status === 200) {
          this.product.set(detail.data.data);
          console.log('DETAIL:', detail.data);
        }

        if (list.status === 200) {
          this.dataListProduct.set(list.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //  LOAD COMMENT
  async loadComments(productId: number) {
    try {
      const res = await this.commentService.getByProduct(productId);

      const data = res.data?.data || res.data || [];

      this.comments.set(data);

      console.log('COMMENTS:', data); // debug

    } catch (error) {
      console.error(error);
    }
  }

  relatedProducts(): IProduct[] {
    const product = this.product();

    if (!product) return [];

    return this.dataListProduct()
      .filter((p) => p.category_id === product.category_id && p.id !== product.id)
      .slice(0, 4);
  }

  async addToCart(quantityInput: HTMLInputElement) {
    const user = this.authService.getUser();
    const product = this.product();

    // ✅ LOG RA XEM CÓ GÌ
    console.log('USER:', user);
    console.log('PRODUCT:', product);

    if (!user || !user.id) {
      alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
      this.authService.logout(); // ✅ Xóa luôn token cũ
      window.location.href = '/login';
      return;
    }

    if (!product || !product.id) {
      alert('Chưa load được sản phẩm');
      return;
    }

    const quantity = Number(quantityInput.value);
    if (!quantity || quantity <= 0) {
      alert('Số lượng phải lớn hơn 0');
      return;
    }

    const cartItem = {
      user_id: Number(user.id),
      product_id: Number(product.id),
      price: Number(product.sale_price || product.price),
      quantity: quantity,
    };

    console.log('GỬI LÊN BE:', cartItem); // ✅ Phải thấy đủ 4 field

    try {
      const res = await this.cartService.add(cartItem);
      if (res.status === 200 || res.status === 201) {
        alert('Thêm vào giỏ hàng thành công!');
      }
    } catch (error: any) {
      console.error('LỖI CHI TIẾT:', error.response?.data);
      alert(error.response?.data?.message || 'Lỗi khi thêm vào giỏ hàng!');
    }
  }
}
