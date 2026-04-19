import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../../services/blog.service';
import { IBlog } from '../../../../interfaces/blog.interface';
import { RouterLink } from "@angular/router";
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit{
  ngOnInit(): void {
    this.fetchData();
  }
  dataListBlog = signal<IBlog[]>([]);

  constructor(
    private blogService : BlogService,
    private noti: NotificationService
  ){}

  fetchData = async () =>{
    const result = await this.blogService.list();
    if (result.status === 200){
      this.dataListBlog.set(result.data.data);
    }
  }

  onDelete = async (id: number) => {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa không?');
    if (!confirmDelete) return;

    try {
      await this.blogService.delete(id);

      // ✅ đảm bảo đồng bộ
      await this.fetchData();

      this.noti.show('Xóa bài viết thành công!', 'success');

    } catch (error) {
      this.noti.show('Lỗi khi xóa bài viết', 'danger');
    }
  };
}
