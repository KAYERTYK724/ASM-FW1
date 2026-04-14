import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { IProduct } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View implements OnInit {
  product = signal<IProduct | null>(null);

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(Number(id));
    }
  }

  async loadProduct(id: number) {
    try {
      const res = await this.productService.getById(id);
      this.product.set(res.data.data);
    } catch (error) {
      console.error('Lỗi khi tải chi tiết sản phẩm', error);
      alert('Không tìm thấy sản phẩm!');
    }
  }
}
