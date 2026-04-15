import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../../../services/comment.service';
import { ProductService } from '../../../../services/product.service';
import { UserService } from '../../../../services/user.service';
import { IComment } from '../../../../interfaces/comment.interface';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
})
export class List {
  dataListComment = signal<IComment[]>([]);
  products = signal<any[]>([]);
  users = signal<any[]>([]);

  constructor(
    private commentService: CommentService,
    private productService: ProductService,
    private userService: UserService,
    private noti: NotificationService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const [cmtRes, productRes, userRes] = await Promise.all([
        this.commentService.list(),
        this.productService.list(),
        this.userService.list(),
      ]);

      this.products.set(productRes.data.data);
      this.users.set(userRes.data.data);

      const comments = cmtRes.data.data.map((cmt: any) => ({
        ...cmt,
        product: this.products().find((p) => p.id == cmt.product_id),
        user: this.users().find((u) => u.id == cmt.user_id),
      }));

      this.dataListComment.set(comments);
    } catch (error) {
      this.noti.show('Lỗi tải dữ liệu', 'danger');
    }
  };
}
