import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageUploadComponent } from '../image-upload.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ImageUploadComponent, ReactiveFormsModule, CommonModule, CKEditorModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add implements OnInit {
  public Editor: any = null;
  isBrowser = false;
  productImages = signal<string[]>([]);
  productForm: FormGroup;
  categories = signal<any[]>([]);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public router: Router,
    private noti: NotificationService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.productForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        category_id: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(1000)]],
        sale_price: [null, [Validators.min(0)]],
        status: [1, Validators.required],
        description: ['', [Validators.required, Validators.maxLength(5000)]],
      },
      {
        validators: this.salePriceValidator,
      },
    );
  }

  salePriceValidator(form: FormGroup) {
    const price = form.get('price')?.value;
    const sale = form.get('sale_price')?.value;

    if (sale && price && sale >= price) {
      return { invalidSalePrice: true };
    }
    return null;
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      import('@ckeditor/ckeditor5-build-classic').then((module) => {
        this.Editor = module.default;
      });
    }
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
    // 1. Kiểm tra ảnh trước khi check form
    if (this.productImages().length === 0) {
      this.noti.show('Vui lòng tải lên ít nhất một hình ảnh', 'warning');
      return; // Dừng lại luôn
    }

    // 2. Log lỗi để debug nếu form không valid
    if (this.productForm.invalid) {
      console.log('Lỗi Form:', this.productForm.errors);
      console.log('Chi tiết lỗi từng field:', {
        name: this.productForm.get('name')?.errors,
        description: this.productForm.get('description')?.errors,
        price: this.productForm.get('price')?.errors,
      });
      this.productForm.markAllAsTouched();
      return;
    }

    // 3. Nếu form valid thì mới chạy tiếp
    const rawData = this.productForm.value;
    const payload = {
      ...rawData,
      image: this.productImages()[0], // Lấy ảnh đầu tiên
      // Lưu ý: Kiểm tra backend cần true/false hay 1/0
      status: Number(rawData.status) === 1,
    };

    console.log('Payload gửi đi:', payload); // Xem dữ liệu có đúng ý chưa

    try {
      const response = await this.productService.add(payload);
      if (response.status === 201 || response.status === 200) {
        this.noti.show('Thêm sản phẩm thành công!', 'success');
        this.router.navigate(['/admin/product']);
      }
    } catch (error: any) {
      // Log lỗi chi tiết từ server trả về
      console.error('Lỗi API:', error.response?.data);
      this.noti.show(error.response?.data?.message || 'Lỗi server', 'danger');
    }
  }
}
