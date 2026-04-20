import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { IProduct } from '../../../interfaces/product.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CommentService } from '../../../services/comment.service'; 

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.scss',
})
export class DetailProduct implements OnInit {

  product: IProduct | null = null;
  dataListProduct = signal<IProduct[]>([]);

  // THÊM
  comments = signal<any[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private commentService: CommentService, //  thêm
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      await this.fetchData(id);
      await this.loadComments(id); // gọi comment
    });
  }

  async fetchData(id: number) {
    try {
      const [detail, list] = await Promise.all([
        this.productService.getById(id),
        this.productService.list()
      ]);

      if (detail.status === 200) {
        this.product = detail.data.data;
        this.cdr.detectChanges();
      }

      if (list.status === 200) {
        this.dataListProduct.set(list.data.data);
      }

    } catch (error) {
      console.error(error);
    }
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
    if (!this.product) return [];

    return this.dataListProduct()
      .filter(p =>
        p.category_id === this.product!.category_id &&
        p.id !== this.product!.id
      )
      .slice(0, 4);
  }
}