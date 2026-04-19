import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss'],
})
export class CategoryEdit implements OnInit {

  categoryId!: number;

  category = {
    name: '',
    parent_id: null as number | null,
    status: true
  };

  listCategory = signal<any[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCategories();
    this.loadDetail();
  }

  loadCategories = async () => {
    try {
      const res = await this.categoryService.list();

      if (res.status === 200) {
        this.listCategory.set(res.data.data);
      }

    } catch (error) {
      this.noti.show('Lỗi tải danh mục', 'danger');
    }
  };

  loadDetail = async () => {
    try {
      const res = await this.categoryService.getById(this.categoryId);

      if (res.status === 200) {
        const data = res.data.data;

        this.category = {
          name: data.name || '',
          parent_id: data.parent_id ?? null,
          status: data.status ?? true
        };
      }

    } catch (error) {
      this.noti.show('Không tìm thấy danh mục', 'danger');
    }
  };

  onSubmit = async () => {
    try {
      const payload = {
        name: this.category.name,
        parent_id: this.category.parent_id || null,
        status: this.category.status
      };

      const res = await this.categoryService.update(this.categoryId, payload);

      if (res.status === 200) {
        this.noti.show('Cập nhật thành công', 'success');
        this.router.navigate(['/admin/category']);
      }

    } catch (error) {
      this.noti.show('Lỗi cập nhật', 'danger');
    }
    
  };
  goToCategory() {
  this.router.navigate(['/admin/category']);
}
}