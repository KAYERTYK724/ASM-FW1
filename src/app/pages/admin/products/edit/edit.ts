import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core'; // Xóa inject ở đây
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { ImageUploadComponent } from '../image-upload.component';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUploadComponent, CKEditorModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit implements OnInit {
  public Editor: any = null;
  isBrowser = false;
  productForm: FormGroup;
  categories = signal<any[]>([]);
  productImages = signal<string[]>([]);
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public router: Router,
    private noti: NotificationService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category_id: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1000)]],
      sale_price: [0, [Validators.min(0)]],
      status: [1, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      import('@ckeditor/ckeditor5-build-classic').then((module) => {
        this.Editor = module.default;
      });
    }

    this.loadCategories();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.loadProductData(this.productId);
    }
  }

  async loadCategories() {
    try {
      const res = await this.categoryService.list();
      this.categories.set(res.data.data);
    } catch (error) {
      console.error('Lỗi lấy danh mục', error);
    }
  }

  async loadProductData(id: number) {
    try {
      const res = await this.productService.getById(id);
      const product = res.data.data;

      this.productForm.patchValue({
        name: product.name,
        category_id: product.category_id,
        price: product.price,
        sale_price: product.sale_price,
        status: product.status ? 1 : 0,
        description: product.description,
      });

      if (product.image) {
        this.productImages.set([product.image]);
      }
    } catch (error) {
      this.noti.show('Không tìm thấy sản phẩm!', 'danger');
      this.router.navigate(['/admin/product']);
    }
  }

  handleImagesUpdate(urls: string[]) {
    this.productImages.set(urls);
  }

  isInvalid(controlName: string) {
    const control = this.productForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  async onSubmit() {
    this.productForm.markAllAsTouched();

    console.log('Form Valid Status:', this.productForm.valid);
    if (!this.productForm.valid) {
      console.log('Lỗi chi tiết:', this.productForm.errors);
      console.log('Lỗi Description:', this.productForm.get('description')?.errors);
      return;
    }

    if (this.productId) {
      const rawData = this.productForm.value;
      const payload = {
        ...rawData,
        image: this.productImages().length > 0 ? this.productImages()[0] : '',
        status: Number(rawData.status) === 1,
      };

      try {
        await this.productService.update(this.productId, payload);
        this.noti.show('Cập nhật dữ liệu thành công!', 'success');
        this.router.navigate(['/admin/product']);
      } catch (error: any) {
        console.error('Lỗi API:', error);
        this.noti.show('Lỗi: ' + (error.response?.data?.message || error.message), 'danger');
      }
    }
  }
}
