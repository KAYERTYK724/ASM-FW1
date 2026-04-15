import { Component, OnInit } from '@angular/core';
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

  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private noti: NotificationService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: [true]
    });
  }

  ngOnInit() { }

  isInvalid(controlName: string) {
    const control = this.categoryForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  async onSubmit() {
    if (this.categoryForm.valid) {
      try {
        const payload = this.categoryForm.value;

        const res = await this.categoryService.add(payload);

        if (res.status === 201 || res.status === 200) {
          this.noti.show('Thêm danh mục thành công!', 'success');
          this.router.navigate(['/admin/category']);
        }

      } catch (error: any) {
        console.error(error);
        this.noti.show('Lỗi khi thêm danh mục', 'danger');
      }

    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}