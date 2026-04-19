import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add implements OnInit {

  categories = signal<any[]>([]);
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private noti: NotificationService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      parent_id: [null],
      status: [true]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  // 👉 validate
  isInvalid(controlName: string) {
    const control = this.categoryForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  // 🔥 LOAD DATA GỌN + CHUẨN
  async loadCategories() {
    try {
      const res = await this.categoryService.list();

      if (res.status === 200) {
        // 👉 giữ nguyên data từ backend (đã có parent)
        this.categories.set(res.data.data);
      }

    } catch (error) {
      console.error('Lỗi load category:', error);
      this.noti.show('Lỗi tải danh mục', 'danger');
    }
  }

  // 👉 submit
  async onSubmit() {
    if (this.categoryForm.valid) {
      try {
        const formValue = this.categoryForm.value;

        const payload = {
          name: formValue.name,
          parent_id: formValue.parent_id || null,
          status: formValue.status ?? true
        };

        const res = await this.categoryService.add(payload);

        if (res.status === 201 || res.status === 200) {
          this.noti.show('Thêm danh mục thành công!', 'success');
          this.router.navigate(['/admin/category']);
        }

      } catch (error) {
        console.error(error);
        this.noti.show('Lỗi khi thêm danh mục', 'danger');
      }

    } else {
      this.categoryForm.markAllAsTouched();
    }

  }
  goToCategory() {
    this.router.navigate(['/admin/category']);
  }
}