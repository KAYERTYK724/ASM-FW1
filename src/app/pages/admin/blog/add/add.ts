<<<<<<< HEAD
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
import { Router } from '@angular/router';
import { BlogService } from '../../../../services/blog.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ImageUploadComponent } from '../../products/image-upload.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule,
    ImageUploadComponent
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss',
  host: { ngSkipHydration: 'true' }
})
export class Add implements OnInit {

  Editor: any;
  isEditorReady = false;
  isBrowser = false;

  blogImages: string[] = [];

  // ✅ typed form
  blogForm!: FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
    status: FormControl<number>;
  }>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private noti: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.blogForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(5000)]
      }),
      status: this.fb.nonNullable.control(1, {
        validators: [Validators.required]
      }),
    });
  }

  async ngOnInit() {
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

  isInvalid(field: keyof typeof this.blogForm.controls): boolean {
    const control = this.blogForm.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  handleImagesUpdate(urls: string[]) {
    this.blogImages = urls;
  }

  onReset() {
    this.blogForm.reset({
      title: '',
      content: '',
      status: 1
    });
    this.blogImages = [];
  }

  async onSubmit() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    const raw = this.blogForm.getRawValue();

    const payload = {
      ...raw,
      image: this.blogImages[0] ?? '',
      status: raw.status === 1
    };

    try {
      const res = await this.blogService.add(payload);

      if (res.status === 200 || res.status === 201) {
        this.noti.show('Thêm bài viết thành công!', 'success');
        this.router.navigate(['/admin/blog']);
      }
    } catch (err: any) {
      this.noti.show(err.response?.data?.message || 'Lỗi khi thêm blog', 'danger');
    }
  }
}
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  imports: [],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {}
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
