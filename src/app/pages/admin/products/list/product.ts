import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import { IProduct } from '../../../../interfaces/product.interface';
import { RouterLink } from "@angular/router";
import { NotificationService } from '../../../../services/notification/notification.service'; 

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
})
export class Product implements OnInit {
  dataListProduct = signal<IProduct[]>([]);

  constructor(
    private productService: ProductService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const result = await this.productService.list();
      if (result.status === 200) {
        this.dataListProduct.set(result.data.data);
      }
    } catch (error) {
      this.noti.show('Lỗi tải dữ liệu', 'danger');
    }
  };

  onDelete = async (id: number) => {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa không?');
    if (confirmDelete) {
      try {
        const result = await this.productService.delete(id);
        if (result.status === 200 || result.status === 204) {
          this.dataListProduct.update(products => products.filter(p => p.id !== id));
          this.noti.show('Xóa sản phẩm thành công!', 'success');
        }
      } catch (error) {
        this.noti.show('Lỗi khi xóa sản phẩm', 'danger');
      }
    }
  };
}
