import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit implements OnInit {

  categoryForm: FormGroup;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public router: Router,
    private noti: NotificationService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: [true]
    });
  }

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.categoryId) {
      this.loadCategory(this.categoryId);
    }
  }

  async loadCategory(id: number) {
    try {
      const res = await this.categoryService.getById(id);

      //  API bạn: data nằm trong res.data
      const category = res.data;

      this.categoryForm.patchValue({
        name: category.name,
        status: category.status ?? true
      });

    } catch (error) {
      this.noti.show('Không tìm thấy danh mục!', 'danger');
      this.router.navigate(['/admin/category']);
    }
  }

  isInvalid(controlName: string) {
    const control = this.categoryForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  async onSubmit() {
    this.categoryForm.markAllAsTouched();

    if (this.categoryForm.valid && this.categoryId) {
      try {
        const payload = this.categoryForm.value;

        await this.categoryService.update(this.categoryId, payload);

        this.noti.show('Cập nhật danh mục thành công!', 'success');
        this.router.navigate(['/admin/category']);

      } catch (error: any) {
        this.noti.show('Lỗi khi cập nhật danh mục', 'danger');
      }
    }
  }
}