import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../../interfaces/category.interface';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
})
export class Category {

  categories: ICategory[] = [
    {
      id: 1,
      name: 'Áo Nam',
      parent_id: 0,
      status: true,
      created_at: '2026-03-01'
    },
    {
      id: 2,
      name: 'Quần Jean',
      parent_id: 0,
      status: true,
      created_at: '2026-03-05'
    },
    {
      id: 3,
      name: 'Váy Nữ',
      parent_id: 0,
      status: true,
      created_at: '2026-03-07'
    },
    {
      id: 4,
      name: 'Phụ kiện (Thắt lưng, Ví)',
      parent_id: 1, // Ví dụ: thuộc danh mục con
      status: false,
      created_at: '2026-03-10'
    },
    {
      id: 5,
      name: 'Đồ mặc nhà',
      parent_id: 0,
      status: true,
      created_at: '2026-03-15'
    }
  ];

}