import { Component, signal, OnInit } from '@angular/core'; // Loại bỏ inject
import { ImageUploadComponent } from '../image-upload.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ImageUploadComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add implements OnInit {
  productImages = signal<string[]>([]);
  productForm: FormGroup;
  categories = signal<any[]>([]);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public router: Router,
    private noti: NotificationService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category_id: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1000)]],
      sale_price: [0, [Validators.min(0)]],
      status: [1, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  isInvalid(controlName: string) {
    const control = this.productForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  async loadCategories() {
    try {
      const res = await this.categoryService.list();
      this.categories.set(res.data.data);
    } catch (error) {
      console.error('Lỗi lấy danh mục:', error);
    }
  }

  handleImagesUpdate(urls: string[]) {
    this.productImages.set(urls);
  }

  async onSubmit() {
    if (this.productForm.valid) {
      const rawData = this.productForm.value;

      const payload = {
        ...rawData,
        image: this.productImages().length > 0 ? this.productImages()[0] : '',
        status: rawData.status == 1 ? true : false
      };

      try {
        const response = await this.productService.add(payload);
        if (response.status === 201 || response.status === 200) {
          this.noti.show('Thêm sản phẩm thành công!', 'success');
          this.router.navigate(['/admin/product']);
        }
      } catch (error: any) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        this.noti.show(error.response?.data?.message || 'Có lỗi xảy ra khi thêm', 'danger');
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
