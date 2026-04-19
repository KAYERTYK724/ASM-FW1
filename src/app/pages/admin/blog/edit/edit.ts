import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../../../services/blog.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ImageUploadComponent } from '../../products/image-upload.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CKEditorModule,
    ImageUploadComponent,
  ],
  templateUrl: './edit.html',
  host: { ngSkipHydration: 'true' }
})
export class Edit implements OnInit {

  // ✅ CKEditor
  Editor: any;
  isEditorReady = false;
  isBrowser = false;

  // ✅ Data
  blogImages: string[] = [];
  id!: number;

  // ✅ Typed Form (FIX CHÍNH)
  blogForm!: FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
    status: FormControl<number>;
  }>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private noti: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // ✅ Init form chuẩn typed
    this.blogForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: this.fb.nonNullable.control('', {
        validators: [Validators.required]
      }),
      status: this.fb.nonNullable.control(1, {
        validators: [Validators.required]
      }),
    });
  }

  async ngOnInit() {

    // ✅ 1. Lấy ID
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    this.id = Number(idParam);
    if (isNaN(this.id)) return;

    // ✅ 2. Load data
    try {
      const res = await this.blogService.getById(this.id);
      const blog = res.data.data;

      this.blogForm.patchValue({
        title: blog.title ?? '',
        content: blog.content ?? '',
        status: blog.status ?? 1
      });

      if (blog.image) {
        this.blogImages = [blog.image];
      }

    } catch (err) {
      console.error('Load blog error:', err);
    }

    // ✅ 3. Load CKEditor (FIX SSR + race condition)
    if (this.isBrowser) {
      setTimeout(async () => {
        try {
          const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic')).default;
          this.Editor = ClassicEditor;
          this.isEditorReady = true;
          this.cdr.detectChanges();
        } catch (err) {
          console.error('CKEditor load error:', err);
        }
      }, 0);
    }
  }

  // ✅ FIX TYPE SAFE
  isInvalid(field: keyof typeof this.blogForm.controls): boolean {
    const control = this.blogForm.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  handleImagesUpdate(urls: string[]) {
    this.blogImages = urls;
  }

  async onSubmit() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    const formData = this.blogForm.getRawValue();

    const payload = {
      ...formData,
      image: this.blogImages[0] ?? ''
    };

    try {
      await this.blogService.update(this.id, payload);

      this.noti.show('Cập nhật thành công!', 'success');
      this.router.navigate(['/admin/blog']);

    } catch (err) {
      console.error('Update error:', err);
      this.noti.show('Lỗi khi cập nhật', 'danger');
    }
  }
}
