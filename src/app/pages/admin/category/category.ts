import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './category.html',
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  loading = false;

  form: any = {
    id: null,
    name: '',
    parent_id: null
  };

  isEdit = false;
  api = 'http://localhost:4000/api/categories';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // LẤY DANH SÁCH
  loadCategories() {
    this.loading = true;

    this.http.get<any>(`${this.api}/list`)
      .subscribe({
        next: (res) => {
          this.categories = res.data || [];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  // THÊM / SỬA
  submitForm() {
    if (!this.form.name) return;

    if (this.isEdit) {
      this.http.put(`${this.api}/${this.form.id}`, this.form)
        .subscribe(() => {
          this.resetForm();
          this.loadCategories();
        });
    } else {
      this.http.post(`${this.api}/add`, this.form)
        .subscribe(() => {
          this.resetForm();
          this.loadCategories();
        });
    }
  }

  // CHỌN SỬA
  editCategory(c: any) {
    this.form = { ...c };
    this.isEdit = true;
  }

  // XÓA
  deleteCategory(id: number) {
    if (!confirm('Bạn có chắc muốn xóa?')) return;

    this.http.delete(`${this.api}/${id}`)
      .subscribe(() => {
        this.loadCategories();
      });
  }

  // RESET FORM
  resetForm() {
    this.form = { id: null, name: '', parent_id: null };
    this.isEdit = false;
  }
}