import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../../services/upload/cloud.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="upload-dropzone d-flex flex-column align-items-center justify-content-center p-4 border border-dashed rounded-3"
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
      (click)="fileInput.click()"
    >
      <i class="bi bi-cloud-arrow-up fs-2"></i>
      <p class="mb-1 mt-2">Kéo thả ảnh vào đây hoặc <strong>nhấp để chọn</strong></p>
      <input
        #fileInput
        type="file"
        class="d-none"
        (change)="onFileSelected($event)"
        multiple
        accept="image/*"
      />
    </div>

    <div class="image-preview-list d-flex flex-wrap gap-3 mt-3">
      @for (url of imageUrls(); track url) {
        <div class="position-relative">
          <img
            [src]="url"
            class="rounded border shadow-sm"
            style="width: 100px; height: 100px; object-fit: cover;"
          />
          <button
            type="button"
            class="btn-close btn-close-white position-absolute top-0 end-0 m-1 bg-danger shadow-sm p-1 rounded-circle"
            (click)="removeImage(url); $event.stopPropagation()"
          ></button>
        </div>
      }
    </div>
  `,
  styleUrls: ['./image-upload.component.scss'], // Bạn có thể chuyển phần CSS upload đã viết vào đây
})
export class ImageUploadComponent {
  imageUrls = signal<string[]>([]);
  @Output() imagesChanged = new EventEmitter<string[]>();

  constructor(private cloudinary: CloudinaryService) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    this.processFiles(files);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    this.processFiles(files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private processFiles(files: FileList | null | undefined) {
    if (files && files.length > 0) {
      Array.from(files).forEach((file: any) => this.uploadFile(file));
    }
  }

  private uploadFile(file: File) {
    this.cloudinary.uploadImage(file).then((res: any) => {
      this.imageUrls.update((prev) => {
        const newList = [...prev, res.data.secure_url];
        this.imagesChanged.emit(newList); // Gửi danh sách mới cho cha
        return newList;
      });
    });
  }

  removeImage(urlToRemove: string) {
    this.imageUrls.update((prev) => {
      const newList = prev.filter((url) => url !== urlToRemove);
      this.imagesChanged.emit(newList); // Gửi danh sách đã cập nhật cho cha
      return newList;
    });
  }
}
