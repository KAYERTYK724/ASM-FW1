import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import { RouterLink } from "@angular/router";
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
})
export class Category implements OnInit {

  dataListCategory = signal<any[]>([]);

  constructor(
    private categoryService: CategoryService,
    private noti: NotificationService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const res = await this.categoryService.list();

      if (res.status === 200) {
        const data = res.data.data;

        // sort nhẹ cho đẹp
        data.sort((a: any, b: any) => {
          if (!a.parent_id && b.parent_id) return -1;
          if (a.parent_id && !b.parent_id) return 1;
          return 0;
        });

        this.dataListCategory.set(data);
      }

    } catch (error) {
      this.noti.show('Lỗi tải danh mục', 'danger');
    }
  };

  onDelete = async (id: number) => {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa không?');

    if (confirmDelete) {
      try {
        const res = await this.categoryService.delete(id);

        if (res.status === 200 || res.status === 204) {
          this.dataListCategory.update(list =>
            list.filter(c => c.id !== id)
          );

          this.noti.show('Xóa danh mục thành công!', 'success');
        }

      } catch (error) {
        this.noti.show('Lỗi khi xóa danh mục', 'danger');
      }
    }
  };
}